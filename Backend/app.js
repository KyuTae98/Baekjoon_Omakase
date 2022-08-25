const express = require('express');
const app = express();
const port = 3000
const path = require('path')
const cors = require('cors');

//const authRouter = require('./routes/auth');
const baekjoonRouter = require('./routes/baekjoon_test')


app.use(express.static(path.join(__dirname, '../my-app/build')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'))
})


/*app.get('/', (req, res) => {
    res.json({
        success: true,
    })

})*/

//app.use('',authRouter);
app.use('', baekjoonRouter);

/*
app.get('/userid/:id', (req, res) => {


    const userid = req.params.id;
    let usertier;

    const BOJ = new baekjoon();

    function findTier(userid) {
        return new Promise(function (res, rej) {
            BOJ.baekjoonstart(userid);
        })
    }

    findTier(userid).then(function(tier){
        usertier = tier;
        console.log(tier);
    });

    console.log(userid);
    console.log(usertier);

    res.json({
        "userid": userid,
        "tier": usertier
    })
})
*/




app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})