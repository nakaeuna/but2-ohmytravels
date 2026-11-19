"use strict"
import {travelDAO} from '../dao/dao.mjs'
import { callGemini } from '../geminiAPI/geminiAPI.mjs'
import { Travel } from '../model/model.mjs';
import Ajv from 'ajv';
import addFormats from 'ajv-formats'
const ajv = new Ajv();
addFormats(ajv)

const travelSchema = {
    "type": "object",
    "required": [
        "id",
        "countryName",
        "city",
        "overview",
        "estimatedPrice",
        "start_date",
        "end_date"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "countryName": {
            "type": "string"
        },
        "city": {
            "type": "object",
            "required": [
                "cityName"
            ],
            "properties": {
                "cityName": {
                    "type": "string"
                },
                "activities": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "activityName"
                        ],
                        "properties": {
                            "activityName": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        }
                    }
                },
                "suggestedHotel": {
                    "type": "object",
                    "required": [
                        "hotelName",
                        "hotelAddress"
                    ],
                    "properties": {
                        "hotelName": {
                            "type": "string"
                        },
                        "hotelAddress": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "links": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "overview": {
            "type": "string"
        },
        "start_date": {
            "type": "string",
            "format": "date-time"
        },
        "end_date": {
            "type": "string",
            "format": "date-time"
        },
        "estimatedPrice": {
            "type": "number"
        }
    }
};


export const travelController = {
    findAll: async () => await travelDAO.findAll(),
    findById: async (id) => {
        const travel = await travelDAO.findById(id)
        return new Travel(travel.travel)
    },
    save: async(userid, travel) => {
        const isDataValid = ajv.validate(travelSchema,travel.travel)
        if (!isDataValid || userid === null) {
            return({"Valid":false})
        }
        await travelDAO.addOne(userid, travel)
        return({"Valid":true})
    },
    remove: async(id) => {
        const delCount = await travelDAO.removeById(id)
        return delCount
    },
    search: async(jsonReq) => {
        const result = await callGemini(jsonReq,travelSchema)
        const newTravel = new Travel(result)
        return newTravel
    }
}

export default travelController

