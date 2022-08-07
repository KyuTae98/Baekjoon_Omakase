const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (userid) => {
    try {
        //한글로 인코딩하려면 encodeURI(userid) 로 변경 필요
        return await axios.get("https://solved.ac/profile/rbxo0109");
    }
    catch (err) {
        console.log(err);
    }
}

const parsing = async (userid) => {
    const html = await getHTML(userid);
    const $ = cheerio.load(html.data);

    const id = $("#__next");
    const $div = $(".css-1midmz7");

    const tier = [];

    $div.each((idx, node) => {
        const T = $(node).find("span").text();
        console.log(T);
    });

    console.log(id.html());
    console.log($div.html());
    //css-5vptc8 >
}

parsing("dkxkqkrtkddn");

