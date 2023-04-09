const myModel = require("../models/userModel");
const { isUnique, hashEmail, hashMobileNumber } = require("../utilities/helpers");

exports.fetchUsers = async (req,res,next) =>{
    console.log(req.body);
    try {
        const allUsers = await myModel.find({})
    res.json({
        users : allUsers,
        message:"Above users retrievied from DB."
    })
    } catch (error) {
        console.log(error);
    }
    
}

exports.saveUser = async (req,res,next) =>{
    try {
        //isUnique is a function which accepts req body, 
        //if user is unique it encrypts mobNumber and email values in req.body is updated to hashed values,
        //if user's mobile or email exist in db then an error field is created in body and is updated to true.
        //if error exists then a new error is created and thrown else success response is sent.
        const newUser = await isUnique(req.body);

        if(newUser.error){
            const customError = new Error("User already exists");
            customError.status = 400;
            throw customError
        }
        
        const userSaved = await myModel.create(newUser);

        res.status(200).json({
            users: userSaved,
            message:"User registered successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

exports.saveWithCC = async(req,res,next)=>{
    try {
        //isUnique is a function which accepts req body, 
        //if user is unique it encrypts mobNumber and email values in req.body is updated to hashed values,
        //if user's mobile or email exist in db then an error field is created in body and is updated to true.
        //if error exists then a new error is created and thrown else success response is sent.
        let newUser = await isUnique(req.body);
        
        if(newUser.error){
            const customError = new Error("User already exists");
            customError.status = 400;
            throw customError
        }
        const createdUser = await myModel.create(newUser)
        res.status(200).json({
            users: createdUser,
            message: "User registered successfully",
            
        })
    } catch (error) {
        next(error)
    }
}