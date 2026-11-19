"use strict"
import {travelDAO} from "../dao/dao.mjs";
import {Travel} from "../model/model.mjs";


"use strict"
import {describe, it, before, beforeEach, after} from "node:test"
import {mongoose} from "mongoose";
import assert from 'node:assert';

let mongod = null
let maConnexion = null


describe("DAO tests", function () {
    //Code reused from TP sessions
    before(async () => {
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


    it("findAll empty", async () => {
        const users = await travelDAO.findAll()
        assert.deepEqual(users, [])
    })

    it("findAll one travel", async () => {
        const travel1 = new Travel({
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

        await travelDAO.addOne({user_id: "aaa", travel : travel1})
        const travels = await travelDAO.findAll()
        assert.deepEqual(travels, [travel1])
    })

    it("findAll two travels", async () => {
        const travel1 = new Travel({
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

        const travel2 = new Travel({
            id: 2, 
            countryName: "Spain", 
            city: {
            cityName: "Madrid",
            activities: [],
            suggestedHotel: "cccc"
            },
            links: ["dddd"], 
            overview: "Super", 
            start_date: new Date().toISOString(), 
            end_date: new Date().toISOString(),
            estimatedPrice: 150
        });

        await travelDAO.addOne({user_id: "aaa", travel : travel1});
        await travelDAO.addOne({user_id: "aaa", travel : travel2});
        const travels = await travelDAO.findAll();
        assert.deepEqual(travels, [travel1, travel2]);
    });


    it("adds and reject with bad data ", async () => {
        const invalidTravel = {aaae: 1, country: "nuuul"};
        try {
            await travelDAO.addOne(invalidTravel);
            assert(false);
        } catch (err) {
            assert.equal(err, "Not a valid travel object");
        }
    })

    it("Add valid travel", async () => {
        const travel = new Travel({
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
            
        const travelFromDb = await travelDAO.addOne({user_id: "aaa", travel : travel});
        assert.deepEqual(travelFromDb, travel);
    });

    it("Add existing travel ID", async () => {
        const travel = new Travel({
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

        await travelDAO.addOne({user_id: "aaa", travel : travel});
        try {
            await travelDAO.addOne({user_id: "aaa", travel : travel});
            assert(false);
        } catch (err) {
            assert.equal(err, "Travel with this ID already exists");
        }
    });

    it("Remove existing travel", async () => {
        const travel = new Travel({
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

        await travelDAO.addOne(travel);
        assert(await travelDAO.removeById(travel.id));
    });
    it("Remove non-existing travel id", async () => {
        assert(!(await travelDAO.removeById(999)));
    });
})