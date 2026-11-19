import express from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const router = express.Router();
const ajv = new Ajv();
addFormats(ajv);

router
    .route('/travel')
    .get(async (req, res) => {
        res.status(200).send({ "travels": [{ "enorme": "salut" }] });
    });
router
    .route('/travel/search')
    .post(async (req, res) => {
        console.log(req.body);
        res.status(200).send({ "enorme": "salut" });
    });
router
    .route('/travel/save')
    .post(async (req, res) => {
        res.status(200).send({ "saved": true });
    });
router
    .route('/travel/:id')
    .get(async (req, res) => {
        res.status(200).send({ "enorme": "salut" });
    })
    .delete(async (req, res) => {
        res.status(200).send({ "deleted": true });
    });

export default router