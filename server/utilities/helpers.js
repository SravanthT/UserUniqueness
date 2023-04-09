const myModel = require("../models/userModel");
const crypto = require('node:crypto');
const key = "EF4359D8D580AA4F7F036D6F04FC6A94" // provided in library we can update it to any 32-yte string

const isUnique= async (body)=>{
    // validate mobile number w.r.t country code and respective validations.
    //if body has separate cc field check if it's string or number convert it to string if required
    if(body.cc) {
        if(typeof body.cc == 'string'){
            body.phoneNum = body.cc+body.phoneNum;
        }else if(typeof body.cc == 'number'){
        body.phoneNum = (body.cc*10**((""+body.phoneNum).length))+body.phoneNum;
        body.phoneNum = "+"+body.phoneNum
        }
    }
    const hashedPhone = hashMobileNumber(body.phoneNum); //function which returns encrypted phoneNum string.
    const hashedEmail = hashEmail(body.email);//function which returns encrypted email string.

    // below code checks for any user registered with encrypted phoneNum or email and stores it in users valiable
    let users = await myModel.find({$or:[{phoneNum: hashedPhone},{email:hashedEmail}]}) 

    //if any user found it adds an error variable as true using which error is thrown
    if(users.length){
        body.error = true
    }

    //if no users found phoneNum and email are updated with their hash values.
    body.phoneNum = hashedPhone;
    body.email = hashedEmail;

    return body;

}

function hashMobileNumber (mobileNumber) {
    mobileNumber += ""
  try {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(mobileNumber);
    return hmac.digest('hex')
  } catch (err) {
    console.error('Error hashing mobile number:', err);
    throw err;
  }
}
function hashEmail(email){
  try {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(email);
    return hmac.digest('hex')
  } catch (err) {
    console.error('Error hashing email:', err);
    throw err;
  }
}

module.exports = {
    hashEmail,hashMobileNumber, isUnique
}