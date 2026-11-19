const express = require('express');
const router = express.Router();
const {userDAO, userModel} = require('../dao');
const {sign} = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const Ajv = require("ajv/dist/2019");
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv)

const forwardedPrefixSwagger = async (req, res, next) => {
    req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url;
    next();
};

router.use('/api-docs', forwardedPrefixSwagger, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

UserSchema = {
    "type": "object",
    "required": [
        "firstname",
        "lastname",
        "password",
        "mail"
    ],
    "properties": {
        "firstname": {
            "type": "string"
        },
        "lastname": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "mail": {
            "type": "string",
            "format": "email"
        },
        "phone": {
            "type": "number"
        }
    }
}

router.post('/register', async (req, res) => {
    /*
    #swagger.tags = ['utilisateur']
    #swagger.description = 'Enregister un nouvelle utilisateur'
     #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/AddUser'}
        }
    */

    const isDataValid = ajv.validate(UserSchema, req.body);

    if (!isDataValid) {
        res.send({"Valid": false});
        return;
    }

    let newUser = new userModel({...req.body})
    newUser.password = newUser.generateHash(req.body.password);
    Object.assign(newUser, {"dateCreatedAccount": Date.now()});
    Object.assign(newUser, {"lastLogDate": Date.now()});

    try {
        await userDAO.addOne(newUser);
    } catch (error) {
        res.status(400).send({"Error": error.message});
    }

    const expireIn = 24 * 60 * 60;
    const token = sign({
            user: newUser
        },
        process.env.SECRET_KEY,
        {
            expiresIn: expireIn
        });

    res.send({"firstname": newUser.firstname, "lastname": newUser.lastname, token: token});
})

router.post('/login', async (req, res) => {
    /*
    #swagger.tags = ['utilisateur']
    #swagger.description = "Connection d'un utilisateur"
     #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/Login'}
        }
    */
    const user = await userModel.findOne({mail: req.body.mail});
    if (!user) {
        res.status(403).json('wrong_credentials');
        return;
    }

    if (!user.validPassword(req.body.password)) {
        res.status(403).json('wrong_credentials');
        return;
    }

    const expireIn = 24 * 60 * 60;
    const token = sign({
            user: user
        },
        process.env.SECRET_KEY,
        {
            expiresIn: expireIn
        });

    res.status(200).json({"firstname": user.firstname, "lastname": user.lastname, token: token});
})

router.get('/debug', async (req, res) => {
    /*
    #swagger.tags = ['utilisateur']
    #swagger.description = "Liste tout les utilisateurs"
    */
    let a = await userDAO.findAll()

    res.send(a);
})

router.get('/user/:userId', async (req, res) => {
    /*
    #swagger.tags = ['utilisateur']
    #swagger.description = "Info sur un utilisateur par son id"
    */
    const userId = req.params.userId
    const user = await userModel.findOne({"_id": userId}, {"password": 0});
    if (!user) {
        res.status(403).json('Invalid Id');
        return;
    }

    res.status(200).json(user);
})

module.exports = router;
