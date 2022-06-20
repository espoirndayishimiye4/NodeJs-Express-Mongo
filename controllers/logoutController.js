const userDB ={ 
    users:require('../model/users.json'),
    setUsers: function (data){this.users = data}
} 

const fspromises = require('fs').promises;
const path = require('path');

const handleRefreshToken = (req,res) =>{

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

const finduser = userDB.users.find(person => person.refreshToken === refreshToken);
if(!finduser){
    res.clearCookie('jwt',{httpOnly:true})
    return res.status(204);
} 

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