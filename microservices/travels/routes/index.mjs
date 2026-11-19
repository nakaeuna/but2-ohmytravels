import express from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { travelController } from '../controller/controller.mjs';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('../swagger.json', import.meta.url)));

const router = express.Router();
const ajv = new Ajv();
addFormats(ajv);


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router
    .route('/travel')
        .get(async (req,res) => {
            // #swagger.summary = 'retrieves all the travels'
            // #swagger.description = 'a list of all the saved travels'
            try{
                let result = await travelController.findAll()
                if (!result) {
                    res.status(404).send('no travel found')
                }else{
                    res.status(200).send(result)
                }
            }catch(err){
                res.status(400).send('error occured' + err)
            }
        })
router
    .route('/travel/search')
        .post(async (req, res) =>{
            // #swagger.summary = 'Search a new travel'
            // #swagger.description = 'searhes a new travel with GeminiAPI'
            // #swagger.security = [{ "apiKeyAuth": [] }]
            try {
                console.log(req.body);
                let result = await travelController.search(req.body)
                if (result == {"Valid":false}){
                    return res.status(404).send(result)
                }
                return res.status(200).send(result)
            } catch (err){
                res.status(400).send('error occured'  + err)
            }
        })
router
    .route('/travel/save')
        .post(async (req,res) =>{
            // #swagger.summary = 'Saves a travel'
            // #swagger.description = '...'
            // #swagger.security = [{ "apiKeyAuth": [] }]
            // #swagger.parameters['body'] = {
            //             in: 'body',
            //             schema: { $ref: '#/definitions/Travel'}
            //         }
            try{
                console.log(req.header("x-user-id"), req.body);
                let result = await travelController.save(req.header('x-user-id') ,req.body)
                if (result == {"Valid":false}){
                    res.status(404).send(result)
                }
                res.status(200).send(result)
            }catch(err){
                res.status(400).send('error occured'  + err)
            }
        })
router
    .route('/travel/:id')
        .get(async (req,res) => {
            // #swagger.summary = 'find a travel by its ID'
            // #swagger.description = '...'
            // #swagger.security = [{ "apiKeyAuth": [] }]
            try {
                let result = await travelController.findById(req.params.id)
                if (result!=null) {
                    res.status(200).send(result)
                }else{
                    res.status(404).send({message: 'travel not found'})
                }
            }catch(err){
                res.status(400).send('error occured'  + err)
            }
        })
        .delete(async (req,res) => {
            // #swagger.summary = 'delete a travel with its ID'
            // #swagger.description = '...'
            try {
                let result = await travelController.remove(req.params.id)
                if (result==true) {
                    res.status(200).send(result)
                }else{
                    res.status(404).send({message: 'travel not found'})
                }
            }catch(err){
                res.status(400).send('error occured'  + err)
            }
        })


export default router;
