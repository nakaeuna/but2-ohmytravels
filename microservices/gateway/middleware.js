const {verify, decode} = require("jsonwebtoken");

SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = function(req, res, next) {
    console.log("api user: ", req.get("x-api-key"));
    if(req.get("x-api-key") === undefined) {
        res.status(401).send("Not authorized");
        return;
    }
    try {
        if (!verify(req.get("x-api-key"), SECRET_KEY)) {
            res.status(401).send("Not authorized");
        }
        req.headers['x-user-id'] = decode(req.get("x-api-key"), SECRET_KEY).user._id;
        console.log("middleware:",  req.header("x-user-id"));
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

module.exports = authMiddleware;