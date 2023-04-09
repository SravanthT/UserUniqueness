const mongoose = require("mongoose");

mongoose.connect("========== MongoURl_here ===========",
{
    useNewUrlParser: true,  
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log(`connected to db.`);
})

const userSchema = new mongoose.Schema({
    userName : {
        type:String
    },
    phoneNum:String,
    email: String,
    Address: String,

})

const userModel = new mongoose.model('BentoUsers',userSchema);

module.exports = userModel;