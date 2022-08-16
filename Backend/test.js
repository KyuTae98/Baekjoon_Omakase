const express = require('express');
const app = express();
const port = 3306;

app.get('/test/:id', async (req,res)=>{
    try{
        const userid = await req.params.id;
        console.log(userid);
        res.json({
            test: "test",
            description: "description",
            userid: userid,
        })
    } catch(e){
        console.error(e);
        /*
        return res.status(500.json({
            error: e,
            errorString: e.toString()
        }));
        */
    }
});

app.get('/solved',async(req,res)=>{
    try{
        res.json({
            solved: "solved"
        })
    } catch(e){
        console.error(e);
        /*
        return res.status(500.json({
            error: e,
            errorString: e.toString()
        }));
        */
    }
});

app.get('/solved/:id',async(req,res)=>{
    try{
        res.json({
            solved: "solved"
        })
    } catch(e){
        console.error(e);
        /*
        return res.status(500.json({
            error: e,
            errorString: e.toString()
        }));
        */
    }
});

app.get('/userid/:id', (req, res) => {

    res.json({
        "userid": userid,
        "tier": 16
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