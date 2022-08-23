const express = require('express');
const app = express();
const router = express.Router()
const port = 3000;
const path = require('path')




app.use(express.static(path.join(__dirname, '../my-app/build')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'))
})

app.post('/test/:id', async (req, res) => {
    try {
        const userid = await req.params.id;
        console.log(userid)
        res.json({
            test: "test",
            description: "description",
            userid: userid,
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString()
        });

    }
});

router.get('/solved', async (req, res) => {
    try {
        res.json({
            solved: "solved"
        })
    } catch (e) {
        console.error(e);
        /*
        return res.status(500.json({
            error: e,
            errorString: e.toString()
        }));
        */
    }
});

router.get('/solved/:id', async (req, res) => {
    try {
        res.json({
            solved: "solved"
        })
    } catch (e) {
        console.error(e);
        /*
        return res.status(500.json({
            error: e,
            errorString: e.toString()
        }));
        */
    }
});

router.get('/userid/:id', (req, res) => {

    res.json({
        "userid": userid,
        "tier": 16
    })
})

router.get('/fail', (req, res) => {
    res.json({
        success: false,
    })
})

app.listen(port, () => {

    console.log(`server is listening at localhost:${port}`);
})
