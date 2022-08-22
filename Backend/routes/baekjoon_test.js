const router = require('express').Router();     //Router 사용하여 기능 별로 구분
const client = require('cheerio-httpcli');      //웹사이트 크롤링

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

//async / await 으로 Callback Hell 해결
router.get('/baekjoon/:id',async(req,res) => {

    const userid = await req.params.id;                     //parameter id를 userid에 저장
    const url = `https://www.acmicpc.net/user/` + userid;   //해당 유저를 검색하도록 url 지정
    const param = {};

    client.set('headers', {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Accept-Charset': 'utf-8'
    });

    //tier 계산
    function tier(userid){
        
        //Pormise로 유저 티어 반환
        return new Promise ((response,rej)=>{
            
            client.fetch(url, param, function (err, $, r) {

                console.log("tier fetch start");

                if (err) {
                    console.log("Find Error");
                    console.log(err);
                    response("iderr");
                    return;
                }

                const html = $(".page-header").find("a").html();    //유저 티어가 포함된 html 저장
                const Tstr = html.toString();                       //html을 string으로 변환
                tier = Tstr.split('/')[4].split('.')[0];            // '/' 와 '.' 으로 각각 나눠준 후에 tier에 저장
                response(tier);                                     //tier response로 반환
            });
            
        })
    }

    function solved(userid){
        
        //Pormise로 푼 문제들 반환
        return new Promise ((response,rej)=>{
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

    function pagenum(t){
        return new Promise(function(response,rej){

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

                response(page[page.length-1]); 
            });
        });
    }

    function unsolved(t,n){
        return new Promise( function(response,rej){
            const url_unsol = 'https://solved.ac/problems/level/' + t + '?page='+n;
            //console.log(url);
            /*
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });
            */

            client.fetch(url_unsol, param, function (err, $, r) {
            
                const problem_unsolved = [];    //문제 저장
                let num;                        //문제 번호 저장
                let title;                      //문제 제목 저장

                console.log("unsolved fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                $(".css-q9j30p").find("span").each((idx, node) => {
                    
                    if(idx%2==0){
                        num = $(node).text();
                    }
                    else if(idx%2==1){
                        title = $(node).text();
                        problem_unsolved.push({
                            number: num,
                            title: title,
                            tier: numTotier[t],
                            url: "https://www.acmicpc.net/problem/"+num,
                        });    
                    }
                       
                });
                
                response(problem_unsolved); 
            });
        });
    }

    try{
        
        let problem_solved = [];    //푼 문제들 저장
        let problem_all = ['0'];       //전체 문제들 저장
        let Tier;                   //유저 티어 저장
        let pageNumber;             //마지막 페이지

        //유저 티어 저장
        await tier(userid).then((T)=>{
            Tier = T;
        })

        console.log(Tier);
        if(Tier=="iderr"){
            return res.status(404).json({
                errorcode: "iderr", 
            })
        }

        //유저가 푼 문제 크롤링
        await solved(userid).then((P)=>{
            problem_solved = P;
        });

        //유저 티어에 해당하는 문제 마지막 페이지 저장
        await pagenum(Tier).then((num)=>{
            pageNumber = num;
        })

        //마지막 페이지까지 문제 탐색
        for(let n = 1;n<=pageNumber;n++){
            await unsolved(Tier,n).then((P)=>{
                problem_all = P.concat(problem_all,P);
            });
        }

        //유저 티어-1 에 해당하는 문제 마지막 페이지 저장
        await pagenum(Tier-1).then((num)=>{
            pageNumber = num;
        })

        //마지막 페이지까지 문제 탐색
        for(let n = 1;n<=pageNumber;n++){
            await unsolved(Tier-1,n).then((P)=>{
                problem_all = P.concat(problem_all,P);
            });
        }

        //유저 티어+1 에 해당하는 문제 마지막 페이지 저장
        await pagenum(parseInt(Tier)+1).then((num)=>{
            pageNumber = num;
        })

        //마지막 페이지까지 문제 탐색
        for(let n = 1;n<=pageNumber;n++){
            await unsolved(parseInt(Tier)+1,n).then((P)=>{
                problem_all = P.concat(problem_all,P);
            });
        }

        //console.log(problem_all.length);

        //문제 정렬
        problem_all.sort(function(a,b){
            return a.number-b.number;
        })

        //이미 푼 문제가 있는지 탐색
        for(let i = 0;i<problem_solved.length;i++){
            //indexOf 함수로 배열내에 해당 값이 있는지 확인
            const idx = problem_all.indexOf(problem_solved[i]);
            if(idx!=-1){
                //해당 값 배열에서 제거
                problem_all.splice(idx,1);
            }
        }
    
        //어느 페이지에 있는 문제를 풀지 랜덤으로 선택
        const rand_1 = Math.floor(Math.random()*(problem_all.length)+1);
        let rand_2 = Math.floor(Math.random()*(problem_all.length)+1);
        let rand_3 = Math.floor(Math.random()*(problem_all.length)+1);

        //문제가 전부 다르게 세팅
        while(rand_1 == rand_2){
            rand_2 = Math.floor(Math.random()*(problem_all.length)+1);
        }
        
        //문제가 전부 다르게 세팅
        while(rand_1 == rand_3 || rand_2 == rand_3){
            rand_3 = Math.floor(Math.random()*(problem_all.length)+1);
        }

        //랜덤 문제 problem에 저장
        const problem = [];

        problem.push(problem_all[rand_1]);
        problem.push(problem_all[rand_2]);
        problem.push(problem_all[rand_3]);
      
        //정렬
        problem.sort(function(a,b){
            return a.number - b.number;
        });

        //console.log(problem_all[1]);
        //console.log(problem_all[problem_all.length-1]);

        //선택한 문제들 반환
        return  res.json(problem);

    } catch(e){
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }
    
});

module.exports = router;
