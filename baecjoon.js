const client = require('cheerio-httpcli');
const url = `https://www.acmicpc.net/user/cu29635`;
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
    $("div:nth-child(2) > div.panel-body > div").find("a").each((idx, node) => {
        arr.push({
            problem: $(node).text()
        })
    })
    console.log(arr)
});