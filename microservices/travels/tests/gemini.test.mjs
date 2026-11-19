//TODO"use strict"

"use strict"
import {describe, it} from "node:test"
import { callGemini } from '../geminiAPI/geminiAPI.mjs'
import { Travel } from '../model/model.mjs'
import { assert } from "console";

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
                    "type": "string"
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

describe("gemini test", function() {
        it("gemini call", async() => {
            const request = {
                "usrLanguage" : "fr-FR",
                "country" : {
                  "countryName" : "United-States",
                },
                "budget" : "2500€",
                "start_date" : new Date("10 April 2025") ,
                "end_date" : new Date("15 April 2025"),
                "environement" : "beach",
                "favoriteActivities" : ["sports","relaxing","shopping"]
            }
            const result = await callGemini(request,travelSchema)
            const travel = new Travel(result)
            assert(travel instanceof Travel)
        })
})