const client = require('cheerio-httpcli');
const url = `https://solved.ac/profile/dkxkqkrtkddn`;
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

    $("span").each(function (idx) {
        const text = $(this).text();
        console.log(text);
    });

    const arr = [];
    
    $("#__next").find('span').each((idx, node) => {
        arr.push({
            tier: $(node).val()
        })
    })

    /*
    $(".css-1midmz7").each((idx, node) => {
        arr.push({
            tier: $(node).val()
        })
    })
    */

    console.log(arr);
});