const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const toolsRouter = require('./tools');
const travelsRouter = require('./travels');

router.get('/', function(req, res) {
    res.send("Index")
})

router.use('/users', userRouter);
router.use('/tools', toolsRouter);
router.use('/travels', travelsRouter);

module.exports = router;
