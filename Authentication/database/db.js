const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected Successfully")
    }catch(e){
        console.error('MongoDB conncection failed');
        process.exit(1);

    }
}
module.exports = connectToDB;