const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/employees',require('./routes/employees'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));

app.get('/', (req,res) =>{
    res.send("hello world");
})

app.listen(PORT, () =>{console.log(`your server is running on port ${PORT}`)});

