const userDB ={ 
    users:require('../model/users.json'),
    setUsers: function (data){this.users = data}
} 


const { error } = require('console');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fspromises = require('fs').promises;


const handleRefreshToken = (req,res) =>{
    const cookies = req.cookies;
    console.log(cookies);
    if(!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
const finduser = userDB.users.find(person => person.refreshToken === refreshToken);
if(!finduser) return res.status(403);

jwt.verify(
    jwt.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if(err || finduser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            {"username": decoded.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        res.json({accessToken});
    }
)

};

module.exports = {handleRefreshToken};