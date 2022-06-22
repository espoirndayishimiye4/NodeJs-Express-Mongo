const path = require('path');
const express = require('express');
const app = express();
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

app.use(express.json());



app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees',require('./routes/employees'));

app.get('/', (req,res) =>{
    res.send("hello world");
})

app.listen(PORT, () =>{console.log(`your server is running on port ${PORT}`)});

