const express = require('express');
const app = express();
const port = 3306;

app.get('/', (req, res) => {
    res.json({
        success: true,
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