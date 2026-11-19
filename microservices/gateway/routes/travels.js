const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require("../middleware");


const proxyMiddleware = createProxyMiddleware({
    target: 'http://travels:3004/api/v1',
    changeOrigin: true,
});

router.post('/travel/search', async (req, res) => {
    const test = await fetch("http://travels:3004/api/v1/travel/search", {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    const a = await test.json()
    res.status(test.status).send(a)
})

router.post('/travel/save', authMiddleware, async (req, res) => {
    const test = await fetch("http://travels:3004/api/v1/travel/save", {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json',
            "x-user-id": req.header("x-user-id")
        }
    })
    const a = await test.json()
    res.status(test.status).send(a)
})

router.use("/", proxyMiddleware)

module.exports = router;