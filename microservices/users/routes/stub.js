const express = require('express');
const router = express.Router();
const Ajv = require("ajv/dist/2019");
const addFormats = require("ajv-formats")

const ajv = new Ajv();
addFormats(ajv)


router.post('/register', function (req, res) {
    console.log(req.body);
    //const isDataValid = ajv.validate(UserSchema, req.body);

    res.send({"Valid": true});
})

router.post('/login', function (req, res) {
    //const api_key = req.header("x-api-key")
    res.send({"connected": true, "key": "4qdq4d8za4v15h6498"});
})

router.post('/modify', function (req, res) {
    //const api_key = req.header("x-api-key")
    res.send({"modify": true});
})

module.exports = router;