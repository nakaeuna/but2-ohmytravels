require('dotenv').config();
const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
const {HttpsProxyAgent} = require('https-proxy-agent');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const forwardedPrefixSwagger = async (req, res, next) => {
    req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url;
    next();
};

router.use('/api-docs', forwardedPrefixSwagger, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const proxy = process.env.https_proxy

let agent = null
if (proxy !== undefined) {
    console.log(`Le proxy est ${proxy}`)
    agent = new HttpsProxyAgent(proxy);
}
else {
    //pour pouvoir consulter un site avec un certificat invalide
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("Pas de proxy trouvé")
}


router.get('/meteo/:latitude/:longitude', async (req, res) => {
    /*
    #swagger.description = "Obtient la météo au coordonée donné"
     */
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    const meteo =  agent!=null ? await fetch(url, {agent: agent}):await fetch(url)

    return res.json(await meteo.json());
})

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

router.get('/meteo2/:ville/:pays', async (req, res) => {
    /*
    #swagger.description = "Obtient la météo dans une ville et un pays donné pendant la période de temps des dates précisées (max 16 jours à partir d'aujourd'hui)"
    */
    const { ville, pays } = req.params;

    try {
        // Étape 1 : Géocodage pour obtenir latitude et longitude
        const url = `${GEOCODING_API}?name=${ville}&country=${pays}&count=1`
        const geoRes = agent!=null ? await fetch(url, {agent: agent}):await fetch(url);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            return res.status(404).json({ error: "Ville/pays introuvable" });
        }

        const { latitude, longitude } = geoData.results[0];

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        const meteo =  agent!=null ? await fetch(urlMeteo, {agent: agent}):await fetch(urlMeteo)

        return res.json(await meteo.json());

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});


paysCache = {date: null, data: null}

router.get('/pays', async (req, res) => {
    /*
    #swagger.description = "Listes les pays dans le mondes"
    */
    if (paysCache.date == null || paysCache.data == null || Math.abs(paysCache.date - Date.now()) / (1000 * 60 * 60 * 24) > 7) {
        paysCache.date = Date.now()

        const url = `https://restcountries.com/v3.1/all`
        const reponse = agent!=null ? await fetch(url, {agent: agent}):await fetch(url)

        if (!reponse.ok) return res.status(500)

        const data = await reponse.json();

        paysCache.data = data
            .map(p => p.translations?.fra?.common || p.name.common)
            .sort((a, b) => a.localeCompare(b, 'fr'))
    }

    res.status(200).send({data: paysCache.data})
})

router.get('/ip/:ip', async (req, res) => {
    /*
    #swagger.description = "Obtient l'address approximate d'un client en function de son IP"
    */
    const ipv4 = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
    const ipv6 = new RegExp("^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(([0-9A-Fa-f]{1,4}:){0,5}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(::([0-9A-Fa-f]{1,4}:){0,5}((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$");

    const ip = req.params.ip;

    if (!ipv4.test(ip) && !ipv6.test(ip)) {
        res.status(400).send("invalid ip");
        return
    }

    const url = `https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`
    const reponse = await (agent!=null ? await fetch(url, {agent: agent}):await fetch(url)).json()

    res.status(200).send({data: reponse})
})

router.get('/photo/:ville/:pays', async (req, res) => {
    /*
    #swagger.description = "Obtient une photo en rapport avec une ville et un pays"
    */
    const ville = req.params.ville;
    const pays = req.params.pays;


    const url = `https://api.pexels.com/v1/search?query=${ville}-${pays}&per_page=5&orientation=landscape&size=medium`
    const reponse = await (agent!=null ? await fetch(url, {agent: agent,
        headers: {
            Authorization: process.env.PEXELS_API_KEY
        }
    }):await fetch(url,  {
        headers: {
            Authorization: process.env.PEXELS_API_KEY
        }
    })).json()

    res.status(200).send({data: reponse})
})

module.exports = router;
