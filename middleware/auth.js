const jwt = require("jsonwebtoken");
const blacklist = require("../blacklist");

const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        console.log(token,blacklist)


        // Blacklist check for logged out users
        if (blacklist.includes(token)) {
            return res.status(401).send("Invalid token. Please")
        }
        
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
               return res.status(401).send(err)
            } else {
                req.role = decoded.role;
                req.userId = decoded._id;
                next();
            }
        });
    } catch (err) {
        res.status(401).send("Invalid token. Please login first!")
    }
}

module.exports = auth;