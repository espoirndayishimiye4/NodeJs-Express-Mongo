const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/employees',require('./routes/employees'))

app.get('/', (req,res) =>{
    res.send("hello world");
})

app.listen(PORT, () =>{console.log(`your server is running on port ${PORT}`)});

