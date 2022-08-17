const router = require('express').Router();
const client = require('cheerio-httpcli');
//const { text } = require('express');
const param = {};

router.get('/baekjoon/:id',async(req,res) => {
    console.log("Baekjoon User API test");
    const userid = await req.params.id;
    const url = `https://www.acmicpc.net/user/` + userid;
    console.log(url);

    function tier(userid){
        
        //Pormise로 유저 티어 반환
        return new Promise ((response,rej)=>{
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });

            let T;

            client.fetch(url, param, function (err, $, r) {
            
                console.log("tier fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                const html = $(".page-header").find("a").html();
                const Tstr = html.toString();
                tier = Tstr.split('/')[4].split('.')[0];
                response(tier); 
            });
        })
    }

    function solved(userid){
        
        //Pormise로 푼 문제들 반환
        return new Promise ((response,rej)=>{
            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });

            let T;

            client.fetch(url, param, function (err, $, r) {
            
                const problem_solved = [];

                console.log("solved fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                $("div:nth-child(2) > div.panel-body > div").find("a").each((idx, node) => {
                    
                    //Json 대신 배열로 변경
                    problem_solved.push($(node).text());               
                    /*
                    problem_solved.push({
                        problem: $(node).text()
                    })
                    */
                });
                
                response(problem_solved); 
            });
        })
    }

    function pagenum(t){
        return new Promise(function(response,rej){

            const url = 'https://solved.ac/problems/level/' + t;
            console.log(url);

            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });

            client.fetch(url, param, function (err, $, r) {
            
                const page = [];

                console.log("page num start");

                if (err) {
                    console.log(err);
                    return;
                }

                $(".css-18lc7iz").find('a').each((idx, node) => {
                        page.push($(node).text());                    
                });
                
                console.log(page);

                response(page[page.length-1]); 
            });
        });
    }

    function unsolved(t,n){
        return new Promise( function(response,rej){
            const url = 'https://solved.ac/problems/level/' + t + '?page='+n;
            console.log(url);

            client.set('headers', {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'Accept-Charset': 'utf-8'
            });

            client.fetch(url, param, function (err, $, r) {
            
                const problem_unsolved = [];

                console.log("unsolved fetch start");

                if (err) {
                    console.log(err);
                    return;
                }

                $(".css-q9j30p").find("span").each((idx, node) => {
                    if(idx%2==0){
                        
                        //Json 대신 배열로 변경
                        problem_unsolved.push($(node).text());                        /*
                        problem_unsolved.push({
                            problem: $(node).text()
                        })
                        */
                    }
                });
                
                response(problem_unsolved); 
            });
        });
    }

    try{
        
        let problem_solved = [];    //푼 문제들 저장
        let problem_all = [];       //전체 문제들 저장
        let Tier;                   //유저 티어 저장
        let pageNumber;             //마지막 페이지
        await tier(userid).then((T)=>{
            Tier = T;
        });
        console.log(Tier);

        await solved(userid).then((P)=>{
            problem_solved = P;
        });
        console.log(problem_solved);

        await pagenum(Tier).then((num)=>{
            pageNumber = num;
        })
        console.log("pageNumber : " + pageNumber);

        //마지막 페이지까지 문제 탐색
        for(let n = 1;n<=pageNumber;n++){
            await unsolved(Tier,n).then((P)=>{
                problem_all.push(P);
            });
        }

        console.log(problem_all);

        console.log("problem ck");

        
        for(let i = 0;i<problem_solved.length;i++){
            for(let n=0;n<pageNumber;n++){
                if(problem_all[n].indexOf(problem_solved[i])!=-1){
                    console.log(problem_solved[i]);
                }
            }
        }
        

        return  res.json({
            tier : Tier,
            solved: problem_solved,
            all: problem_all,
        })

    } catch(e){
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }
    
});

module.exports = router;


/*
const getUserAPI = async(req,res) => {
    try{
        console.log("Baekjoon User API test");
        const url = `https://www.acmicpc.net/user/` + req.userid;
        const solved = [];
        let tier;
        const param = {};

        client.set('headers', {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Accept-Charset': 'utf-8'
        });

        client.fetch(url, param, await function (err, $, res) {
            if (err) {
                console.log(err);
                return;
            }
           
                $("div:nth-child(2) > div.panel-body > div").find("a").each((idx, node) => {
                    solved.push({
                    problem: $(node).text()
                    })
                });

                 console.log(solved);

                const html = $(".page-header").find("a").html();
                const Tstr = html.toString();
                tier = Tstr.split('/')[4].split('.')[0]

            solved.push({
                tier : tier
            })

            //return solved;

           
        });

        //res.json(solved)   
        return solved;

        console.log(solved);
    }
    catch(error){
        console.error(error);
    }
}

const user_info = getUserAPI("dkxkqkrtkddn");
console.log(user_info);

module.exports = getUserAPI;
*/

/*
class baekjoon {
     async baekjoonstart(userid) {
        const url = `https://www.acmicpc.net/user/` + userid;
        const solved = [];
        let tier;
        const param = {};

        await client.set('headers', {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Accept-Charset': 'utf-8'
        });

        //fetch 함수가 아예 실행이 안됨
        await client.fetch(url, param, function (err, $, res) {
            if (err) {
                console.log(err);
                return;
            }
            $("div:nth-child(2) > div.panel-body > div").find("a").each((idx, node) => {
                solved.push({
                problem: $(node).text()
                })
            })

            const html = $(".page-header").find("a").html();
            const Tstr = html.toString();
            tier = Tstr.split('/')[4].split('.')[0];

            console.log(solved);
            console.log(tier);
        });

        console.log("Fetchout");
        console.log(solved);
        console.log(tier);

        return tier;

    }
}

const bj = new baekjoon();
let T;

bj.baekjoonstart("dkxkqkrtkddn").then((tier)=>{
        T = tier;
        console.log(tier);
    } 
);

console.log("Func out");
console.log(T);


//module.exports = baekjoon;
*/