const {format} = require('date-fns');
const { v4: uuid} = require('uuid');
const path = require('path');

const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = async (message) =>{
    const dateTime =`${format(new Date(), 'yyyyMMyy\tHH:MM:SS')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem);
    try {
        await fsPromises.appendFile(path.join(__dirname,"logs","logevents.txt"),logItem);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = logEvents;