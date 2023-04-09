const express = require('express');
const myController = require('./controllers/users');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const port = process.env.PORT || 3000
app.get("/", (req,res)=>{

    res.send("<h1> Hi There .... HAHA</h1>");
})

app.get('/users', myController.fetchUsers);
app.post("/register", myController.saveUser);
app.post("/api/register", myController.saveWithCC);

app.all("*",(req,res)=>{
    res.send("Not a valid route")
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(err.status || 500).json({message:err.message})
    }
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})


module.exports = app