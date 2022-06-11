const userDB ={ 
    users:require('../model/users.json'),
    setUsers: function (data){this.users = data}
} 
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fspromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const handleLogin = async (req,res) =>{
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'username and password is required'});

const finduser = userDB.users.find(person => person.username === user);
if(!finduser) return res.status(401);

const match = await bcrypt.compare(pwd, finduser.password);
if(match){
    const accessToken = jwt.sign(
        {"username": finduser.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'30s'}
    )
    const refreshToken = jwt.sign(
        {"username": finduser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    )
    const otherUsers = userDB.users.filter(person => person.username !== finduser.username);
    const currentUser = {...finduser, refreshToken}
    userDB.setUsers([...otherUsers,currentUser])
    await fspromises.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users)
    );
    res.cookie('jwt', refreshToken,{httpOnly:true, maxAge: 24*60*60*1000})
    res.json({accessToken});
}else{
    res.sendStatus(401);
};
};

module.exports = {handleLogin};