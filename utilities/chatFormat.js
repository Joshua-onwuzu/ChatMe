const moment = require ('moment');

const chatFormat = (username, message, time)=>{
    return{
        username,
        message,
        time : moment().format('h:mm a')
    }
}

module.exports = chatFormat