const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');



router.post('/login', async (req, res) => {
    const test = await fetch("http://users:3002/api/v1/login", {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    const a = await test.json()
    res.status(test.status).send(a)
})

router.post('/register', async (req, res) => {
    const test = await fetch("http://users:3002/api/v1/register", {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    const a = await test.json()
    res.status(test.status).send(a)
})

const proxyMiddleware = createProxyMiddleware({
    target: 'http://users:3002/api/v1',
    changeOrigin: true,
});

router.use("/", proxyMiddleware)

router.get('/nope', authMiddleware, function(req, res) {
    /*
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    */
    res.send("NOPE")
})

module.exports = router;