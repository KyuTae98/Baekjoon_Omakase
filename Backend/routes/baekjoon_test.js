const router = require('express').Router();     //Router ����Ͽ� ��� ���� ����
const client = require('cheerio-httpcli');      //������Ʈ ũ�Ѹ�

const numTotier = [
    'Unrated',
    'Bronze V',
    'Bronze IV',
    'Bronze III',
    'Bronze II',
    'Bronze I',
    'Silver V',
    'Silver IV',
    'Silver III',
    'Silver II',
    'Silver I',
    'Gold V',
    'Gold IV',
    'Gold III',
    'Gold II',
    'Gold I',
    'Platinum V',
    'Platinum IV',
    'Platinum III',
    'Platinum II',
    'Platinum I',
    'Diamond V',
    'Diamond IV',
    'Diamond III',
    'Diamond II',
    'Diamond I',
    'Ruby V',
    'Ruby IV',
    'Ruby III',
    'Ruby II',
    'Ruby I',
    'Master',
];

//async / await ���� Callback Hell �ذ�
router.post('/baekjoon/:id', async (req, res) => {

    const userid = await req.params.id;                     //parameter id�� userid�� ����
    const url = `https://www.acmicpc.net/user/` + userid;   //�ش� ������ �˻��ϵ��� url ����
    const param = {};

    client.set('headers', {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Accept-Charset': 'utf-8'
    });

    //tier ���
    function tier(userid) {

        //Pormise�� ���� Ƽ�� ��ȯ
        return new Promise((response, rej) => {

            client.fetch(url, param, function (err, $, r) {

                console.log("tier fetch start");

                if (err) {
                    console.log("Find Error");
                    console.log(err);
                    response("iderr");
                    return;
                }

                const html = $(".page-header").find("a").html();    //���� Ƽ� ���Ե� html ����
                const Tstr = html.toString();                       //html�� string���� ��ȯ
                tier = Tstr.split('/')[4].split('.')[0];            // '/' �� '.' ���� ���� ������ �Ŀ� tier�� ����
                response(tier);                                     //tier response�� ��ȯ
            });

        })
    }

    function solved(userid) {

        //Pormise�� Ǭ ������ ��ȯ
        return new Promise((response, rej) => {
            /*
                client.set('headers', {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                    'Accept-Charset': 'utf-8'
                });
                */

            client.fetch(url, param, function (err, $, r) {

                const problem_solved = [];

                console.log("solved fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                $("div:nth-child(2) > div.panel-body > div").find("a").each((idx, node) => {
                    problem_solved.push($(node).text());
                });

                response(problem_solved);
            });
        })
    }

    function pagenum(t) {
        return new Promise(function (response, rej) {

            const url_tier = 'https://solved.ac/problems/level/' + t;
            //console.log(url);
            /*
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });
            */
            client.fetch(url_tier, param, function (err, $, r) {

                const page = [];

                console.log("page num start");

                if (err) {
                    console.log(err);
                    return;
                }

                $(".css-18lc7iz").find('a').each((idx, node) => {
                    page.push($(node).text());
                });

                //console.log(page);

                response(page[page.length - 1]);
            });
        });
    }

    function unsolved(t, n) {
        return new Promise(function (response, rej) {
            const url_unsol = 'https://solved.ac/problems/level/' + t + '?page=' + n;
            //console.log(url);
            /*
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });
            */

            client.fetch(url_unsol, param, function (err, $, r) {

                const problem_unsolved = [];    //���� ����
                let num;                        //���� ��ȣ ����
                let title;                      //���� ���� ����

                console.log("unsolved fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                $(".css-q9j30p").find("span").each((idx, node) => {

                    if (idx % 2 == 0) {
                        num = $(node).text();
                    }
                    else if (idx % 2 == 1) {
                        title = $(node).text();
                        problem_unsolved.push({
                            number: num,
                            title: title,
                            tier: numTotier[t],
                            url: "https://www.acmicpc.net/problem/" + num,
                        });
                    }

                });

                response(problem_unsolved);
            });
        });
    }

    try {

        let problem_solved = [];    //Ǭ ������ ����
        let problem_all = ['0'];       //��ü ������ ����
        let Tier;                   //���� Ƽ�� ����
        let pageNumber;             //������ ������

        //���� Ƽ�� ����
        await tier(userid).then((T) => {
            Tier = T;
        })

        console.log(Tier);
        if (Tier == "iderr") {
            return res.status(404).json({
                errorcode: "iderr",
            })
        }

        //������ Ǭ ���� ũ�Ѹ�
        await solved(userid).then((P) => {
            problem_solved = P;
        });

        //���� Ƽ� �ش��ϴ� ���� ������ ������ ����
        await pagenum(Tier).then((num) => {
            pageNumber = num;
        })

        //������ ���������� ���� Ž��
        for (let n = 1; n <= pageNumber; n++) {
            await unsolved(Tier, n).then((P) => {
                problem_all = P.concat(problem_all, P);
            });
        }

        //���� Ƽ��-1 �� �ش��ϴ� ���� ������ ������ ����
        await pagenum(Tier - 1).then((num) => {
            pageNumber = num;
        })

        //������ ���������� ���� Ž��
        for (let n = 1; n <= pageNumber; n++) {
            await unsolved(Tier - 1, n).then((P) => {
                problem_all = P.concat(problem_all, P);
            });
        }

        //���� Ƽ��+1 �� �ش��ϴ� ���� ������ ������ ����
        await pagenum(parseInt(Tier) + 1).then((num) => {
            pageNumber = num;
        })

        //������ ���������� ���� Ž��
        for (let n = 1; n <= pageNumber; n++) {
            await unsolved(parseInt(Tier) + 1, n).then((P) => {
                problem_all = P.concat(problem_all, P);
            });
        }

        //console.log(problem_all.length);

        //���� ����
        problem_all.sort(function (a, b) {
            return a.number - b.number;
        })

        //�̹� Ǭ ������ �ִ��� Ž��
        for (let i = 0; i < problem_solved.length; i++) {
            //indexOf �Լ��� �迭���� �ش� ���� �ִ��� Ȯ��
            const idx = problem_all.indexOf(problem_solved[i]);
            if (idx != -1) {
                //�ش� �� �迭���� ����
                problem_all.splice(idx, 1);
            }
        }

        //��� �������� �ִ� ������ Ǯ�� �������� ����
        const rand_1 = Math.floor(Math.random() * (problem_all.length) + 1);
        let rand_2 = Math.floor(Math.random() * (problem_all.length) + 1);
        let rand_3 = Math.floor(Math.random() * (problem_all.length) + 1);

        //������ ���� �ٸ��� ����
        while (rand_1 == rand_2) {
            rand_2 = Math.floor(Math.random() * (problem_all.length) + 1);
        }

        //������ ���� �ٸ��� ����
        while (rand_1 == rand_3 || rand_2 == rand_3) {
            rand_3 = Math.floor(Math.random() * (problem_all.length) + 1);
        }

        //���� ���� problem�� ����
        const problem = [];

        problem.push(problem_all[rand_1]);
        problem.push(problem_all[rand_2]);
        problem.push(problem_all[rand_3]);

        //����
        problem.sort(function (a, b) {
            return a.number - b.number;
        });

        //console.log(problem_all[1]);
        //console.log(problem_all[problem_all.length-1]);

        //������ ������ ��ȯ
        return res.json(problem);

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }

});

module.exports = router;
