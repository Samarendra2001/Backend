const mongoose = require('mongoose');
const ConncetDb = async()=>{
   await mongoose.connect("mongodb+srv://samrendrak882:Barick2001@cluster0.jrsqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
module.exports = ConncetDb;