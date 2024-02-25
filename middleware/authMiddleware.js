const jwt = require('jsonwebtoken');
const config = require("../config/config");
function authenticateAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token,config.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Only admin users are allowed to access this resource" });
        }
        req.decoded = decoded; 
        next();
    });
}

function authentication(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token,config.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.decoded = decoded; 
        next();
    });
}


module.exports = { authenticateAdmin , authentication };
