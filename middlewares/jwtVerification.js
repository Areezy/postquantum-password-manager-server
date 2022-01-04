const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth) {
        jwt.verify(auth, process.env.SECRET, (err, user) => {
            if (err) {
                res.status(401).send("Token is expired");

            }else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).send("Unauthorized");
    }
};

module.exports = verifyJWT;
