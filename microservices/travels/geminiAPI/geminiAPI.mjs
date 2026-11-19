import {config} from '../config/config.mjs';
import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';

const proxy = process.env.https_proxy

let agent = null
if (proxy !== undefined) {
    console.log(`Le proxy est ${proxy}`)
    agent = new HttpsProxyAgent(proxy);
} else {
    //pour pouvoir consulter un site avec un certificat invalide
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("Pas de proxy trouvé")
}

async function callGemini(jsonReq, jsonSchema) {
    const prompt = "Tu es un assistant de voyage et tu dois me conseiller une idée de voyage dans un objet JSON qui correspond à ce schéma SANS '```json```' autour, n'écrit rien d'autre : "
        + "\n"
        + JSON.stringify(jsonSchema)
        + "\n"
        + "\n, link représente des urls de site web de tourisme local (max 2). avec les données suivantes : "
        + "\n"
        + JSON.stringify(jsonReq)
        + "\n"
        + "le budget n'inclus pas le logement ni le transport, usrLanguage est la langue dans laquelle tu dois répondre."

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.apiKey}`
    const response = await fetch(
        url, {
            agent: agent,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": [
                    {
                        "parts": [
                            {
                                "text": prompt
                            }
                        ]
                    }
                ],
                "generationConfig": { "response_mime_type": "application/json" }
            })
        })
    try {
        const jsonResponse = await response.json();
        return JSON.parse(jsonResponse.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("Failed to parse response as JSON:", error);
        throw new Error("Invalid JSON response" + response.text);
    }
}

export {callGemini}