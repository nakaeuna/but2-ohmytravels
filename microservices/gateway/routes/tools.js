const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');


const proxyMiddleware = createProxyMiddleware({
    target: 'http://tools:3003/api/v1',
    changeOrigin: true,
});

router.use("/", proxyMiddleware)

module.exports = router;