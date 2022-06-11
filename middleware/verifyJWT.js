const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next) =>{
    const autoHeaders = req.headers['authorization'];
    if(!autoHeaders) res.sendStatus(401);
    console.log(autoHeaders);
    const token = autoHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoder) =>{
            if(error) return res.sendStatus(403);
            req.user = decoder.username;
            next();
        }
    )
}

module.exports = verifyJWT;