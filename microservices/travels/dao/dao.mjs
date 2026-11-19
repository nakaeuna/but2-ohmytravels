import {mongoose} from "mongoose";
import {Travel} from "../model/model.mjs"

const travelSchema = new mongoose.Schema({
    user_id : String,
    travel : {
        id: Number,
        countryName: String,
        city:{
            cityName: String,
            activities: [{
                activityName: String,
                description: String
               }],
            suggestedHotel: {
                hotelName: String,
                hotelAddress: String,
            },
        },
        overview: String,
        links: [String],
        start_date : String,
        end_date : String,
        estimatedPrice: Number
    }
});

const travelModel = mongoose.model('Travel', travelSchema);
const projection = { _id: 0, __v: 0 };

const travelDAO = {
    findAll: async () => {
        return (await travelModel.find({},projection)).map(travel => travel.travel.toObject());
    },
    removeAll: async () => {
        await travelModel.deleteMany();
    },
    addOne: async (userid, travel) => {
        if (!(travel.travel instanceof Travel)) {
            return Promise.reject("Not a valid travel object");
        };
        // How to transfer ID ?
        // const existing = await travelModel.findOne({ "travel.id": travel.Travel.id },projection).lean();
        // if (existing) {
        //     return Promise.reject("Travel with this ID already exists");
        // }
        const idk = {user_id: userid, travel: travel};
        const newTravel = new travelModel(idk);
        await newTravel.save();
        return idk;
    },
    findById: async(id) => {
        return (await travelModel.findOne({"travel.id": id},projection))
    },
    findAllByUser: async (userId) => {
        return (await travelModel.find({ user_id: userId }, projection)).map(travel => travel.travel.toObject());
    },
    removeById: async(id) => {
        const result = await travelModel.deleteOne({ "travel.id": id });
        return result.deletedCount > 0;
    }
}

export {travelDAO,travelModel};