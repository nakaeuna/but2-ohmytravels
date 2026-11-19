// import { describe, it, before, after } from "node:test";
// import supertest from "supertest";
// import app from "../app.mjs";
// import { mongoose } from "mongoose";
// import assert from "node:assert";

// let mongod = null;
// let connection = null;
// const request = supertest(app)

// describe("Travel Routes Tests", function () {
//     before(async () => {
//         await mongoose.connection.close();
//         const { MongoMemoryServer } = await import("mongodb-memory-server");
//         mongod = await MongoMemoryServer.create();
//         const uri = mongod.getUri();
//         connection = await mongoose.connect(uri);
//     });

//     after(async () => {
//         await mongod.stop();
//         await connection.disconnect();
//     });

//     it("GET /travel - should retrieve all travels", async () => {
//         const response = await request.get("/travel");
//         assert.equal(response.status, 200);
//         assert.ok(Array.isArray(response.body));
//     });

//     it("POST /travel/search - should search for travels", async () => {
//         const response = await request
//             .post("/travel/search")
//             .set("Content-Type", "application/json")
//             .send({ destination: "Paris" });
//         assert.equal(response.status, 200);
//         assert.ok(response.body);
//     });

//     it("POST /travel/save - should save a travel", async () => {
//         const travelData =  ({id: 1, country: {countryName: "France",cities : []},overview: "tip top", estimatedPrice: 200});
//         const response = await request
//             .post("/travel/save")
//             .set("Content-Type", "application/json")
//             .send(travelData);
//         assert.equal(response.status, 200);
//         assert.deepEqual(response.body, travelData);
//     });

//     it("GET /travel/:id - should retrieve a travel by ID", async () => {
//         const travel =  new Travel({id: 1, country: {countryName: "France",cities : []},overview: "tip top", estimatedPrice: 200});
//         const saveResponse = await request
//             .post("/travel/save")
//             .set("Content-Type", "application/json")
//             .send(travel);
//         const travelId = saveResponse.body._id;

//         const response = await request.get(`/travel/${travelId}`);
//         assert.equal(response.status, 200);
//         assert.deepEqual(response.body, { ...travel, _id: travelId });
//     });

//     it("DELETE /travel/:id - should delete a travel by ID", async () => {
//         const travel =  new Travel({id: 1, country: {countryName: "France",cities : []},overview: "tip top", estimatedPrice: 200});
//         const saveResponse = await request
//             .post("/travel/save")
//             .set("Content-Type", "application/json")
//             .send(travel);
//         const travelId = saveResponse.body._id;

//         const deleteResponse = await request.delete(`/travel/${travelId}`);
//         assert.equal(deleteResponse.status, 200);
//         assert.equal(deleteResponse.body, true);

//         const getResponse = await request.get(`/travel/${travelId}`);
//         assert.equal(getResponse.status, 404);
//         assert.deepEqual(getResponse.body, { message: "travel not found" });
//     });
// });