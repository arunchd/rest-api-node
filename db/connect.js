const mongoose = require("mongoose");

/* uri = "mongodb+srv://arunsingh:HzuW6Q8wvQU3vPu9@restapi.3vsfota.mongodb.net/REST-API?retryWrites=true&w=majority"; */

mongoose.set("strictQuery", false);

const connectDB = (uri)=>{
    console.log("connect db")
    return mongoose.connect(uri, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB;