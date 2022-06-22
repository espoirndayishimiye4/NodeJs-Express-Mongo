const userDB ={ 
    users:require('../model/users.json'),
    setUsers: function (data){this.users = data}
} 

const fspromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req,res) =>{

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

const finduser = userDB.users.find(person => person.refreshToken === refreshToken);
if(!finduser){
    res.clearCookie('jwt',{httpOnly:true})
    return res.status(204);
} 
//delete refreshToken
const otherUsers = userDB.users.filter(person => person.refreshToken !== finduser.refreshToken);
const currentUser ={...finduser, refreshToken: ''};
userDB.setUsers([...otherUsers,currentUser]);
await fspromise.writeFile(
    path.join(__dirname,'..','model','users.json'),
    JSON.stringify(userDB.users)
);
res.clearCookie('jwt',{httpOnly: true});
res.sendStatus(204);
};

module.exports = {handleLogout};