//TODO"use strict"
import travelController from "../controller/controller.mjs";
import { travelDAO } from "../dao/dao.mjs";
import { Travel } from "../model/model.mjs";

"use strict"
import {describe, it, before, beforeEach, after} from "node:test"
import {mongoose} from "mongoose";
import assert from 'node:assert';

let mongod = null
let maConnexion = null

describe("Test du controlleur", function() {
        before(async () => {
            // Code reused from TP sessions
            await mongoose.connection.close()
            const {MongoMemoryServer} = await import('mongodb-memory-server')
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            maConnexion = await mongoose.connect(uri)
        })

        beforeEach(async () => {
            await travelDAO.removeAll()
        })
    
        after(async () => {
            await mongod.stop()
            maConnexion.disconnect()
        })

        it("Empty findAll", async () =>{
            const travels = await travelController.findAll()
            assert.deepEqual(travels, [])
        })

        it("findAll with one travel", async () => {
            const travel1 =  new Travel({
                id: 1, 
                countryName: "France", 
                city: {
                cityName: "Paris",
                activities: [],
                suggestedHotel: "ccc"
                },
                links: ["ddd"], 
                overview: "tip top", 
                start_date: new Date().toISOString(), 
                end_date: new Date().toISOString(),
                estimatedPrice: 200
            });

            await travelController.save(travel1)
            const travels = await travelController.findAll()
            assert.deepEqual(travels, [travel1])
        })

        it("adds and reject with bad data ", async () => {
            const invalidTravel = {aaae: 1, country: "nuuul"};
            const result = await travelController.save(invalidTravel);
            assert.deepEqual(result,{"Valid" : false})
        })

        it("Add valid travel", async () => {
            const travel =  new Travel({
                id: 1, 
                countryName: "France", 
                city: {
                cityName: "Paris",
                activities: [],
                suggestedHotel: "ccc"
                },
                links: ["ddd"], 
                overview: "tip top", 
                start_date: new Date().toISOString(), 
                end_date: new Date().toISOString(),
                estimatedPrice: 200
            });
            
            const result = await travelController.save(travel);
            assert.deepEqual(result,{"Valid" : true });
        });

        it("Search a new travel", async() => {
            const request = {
                "usrLanguage" : "fr-FR",
                "country" : {
                  "countryName" : "India",
                },
                "budget" : "1000€",
                "start_date" : new Date("10 April 2025") ,
                "end_date" : new Date("15 April 2025"),
                "environement" : "cities",
                "favoriteActivities" : ["shopping","walking"]
            }
            const result = await travelController.search(request)
            //console.log(result)
            const travel = new Travel(result)
            assert(travel instanceof Travel)
        })
})