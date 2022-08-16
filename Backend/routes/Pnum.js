const client = require('cheerio-httpcli');

const tier = '10';
const url = `https://solved.ac/problems/level/15?page=1`;
const param = {};

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

    $('.css-q9j30p').find('span').each((idx, node) => {
        if (idx % 2 == 0) {
            arr.push({
                number: $(node).text()
            })
        }
        else {
            arr.push({
                title : $(node).text()
            })


        }
    })

    //마지막 페이지 번호 가져옴
    console.log(arr);
});