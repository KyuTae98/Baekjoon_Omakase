const express = require('express');
const app = express();
const port = 3306;

const baekjoon = require('./baekjoon.js');

app.get('/userid/:id', async (req, res) => {


    const userid = req.params.id;
    let usertier;

    const BOJ = new baekjoon();

    function findTier(userid) {
        return new Promise(function (res, rej) {
            BOJ.baekjoonstart(userid);
        })
    }

    await findTier(userid).then(function(tier){
        usertier = tier;
    });

    console.log(userid);
    console.log(usertier);

    res.json({
        "userid": userid,
        "tier": usertier
    })
})

app.get('/fail', (req, res) => {
    res.json({
        success: false,
    })
})

app.listen(port, () => {
    console.log('server is listening at localhost:${port}');
})