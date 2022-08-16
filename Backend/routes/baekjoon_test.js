const client = require('cheerio-httpcli');
const { text } = require('express');

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
