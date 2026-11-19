const {mongoose} = require("mongoose");
const {compareSync, hashSync, genSaltSync} = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname : String,
    password : {type: String, minLength: 6},
    mail : { type: String, index: true, unique: true },
    phone : Number,
    dateCreatedAccount : Date,
    lastLogDate : Date
})

userSchema.methods.generateHash = function(password) {
    return hashSync(password, genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return compareSync(password, this.password);
};


const userModel = mongoose.model('User', userSchema);

const userDAO = {
    findAll: async () => {
        return (await userModel.find({}))
    },
    addOne: async (user) => {
        return (await userModel.insertOne(user))
    }
}

module.exports = { userDAO, userModel };