const client = require('cheerio-httpcli');

const tier = '10';
let page = 0;
const url = `https://solved.ac/problems/level/15`;
const param = {};
const pnum = require('./Pnum.js');

client.set('headers', {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'Accept-Charset': 'utf-8'
});

client.fetch(url, param, function (err, $, res) {
    if (err) {
        console.log(err);
        return;
    }

    const arr = [];

    $('.css-18lc7iz').find('a').each((idx, node) => {
        arr.push($(node).text())
    })

    page = arr.length;
    //마지막 페이지 번호 가져옴
    console.log(arr);



});

//pnum;

let i = 0;
const problem = [];
for (i = 1; i <= page; i++) {
    client.fetch(url+'?page='+i, param, function (err, $, res) {
        if (err) {
            console.log(err);
            return;
        }

        $('.css-q9j30p').find('span').each((idx, node) => {
            problem.push($(node).text())
        })

        
    });
}

console.log(problem);
