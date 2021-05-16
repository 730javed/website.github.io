const express = require("express")
const path = require("path")

const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/sing',  {useNewUrlParser: true, useUnifiedTopology: true});


const port = 80;

const singupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const singup = mongoose.model('singup', singupSchema);





app.use('/static',express.static('static'))
app.use(express.urlencoded())


app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
 

app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('index.pug',params);
})




app.get("/singup.pug",(req,res)=>{
    const params = {}
    res.status(200).render('singup.pug',params);
})

app.post("/singup",(req,res)=>{
    var myData = new singup(req.body);
    myData.save().then(()=>{
        res.send("this item has been save to database")
    }).catch(()=>{
        res.status(400).send("items was not saved to the database")
    })
    //res.status(200).render('singup.pug');
})
















app.get("/about.pug",(req,res)=>{
    const params = {}
    res.status(200).render('about.pug',params);
})

app.get("/next.pug",(req,res)=>{
    const params = {}
    res.status(200).render('next.pug', params);
})


app.listen(port ,()=>{
    console.log(`this is new pot${port}`)
})