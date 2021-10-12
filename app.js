const express = require('express');
const path=require('path');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const port = 800;
const app=express();

//mongoose specific stuff
mongoose.connect(`mongodb://localhost/contactDance`,{useNewUrlParser:true,useUnifiedTopology: true})
const db = mongoose.connection;
db.on(`error`,console.error.bind(console,`connection error`));
db.once(`open`,()=>{
})
//making the schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  // making the database model
  var contact = mongoose.model('contact', contactSchema);


  


//express specific
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//pug specific
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//endpoints
app.get('/',(req,res)=>{
    res.render('home.pug')
})
app.get('/contact',(req,res)=>{
    res.render('contact.pug')
})
app.get('/about',(req,res)=>{
    res.render('about.pug')
})
app.get('/services',(req,res)=>{
    res.render('services.pug')
})
app.get('/class',(req,res)=>{
    res.render('class.pug')
})

app.post('/contact',(req,res)=>{
var myData = new contact(req.body);
myData.save().then(()=>{
    res.send('This item has been saved to the database')
}).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})
})

//listening or starting the server
app.listen(port,()=>{
    console.log(`This application started successfully on http://127.0.0.1:${port}`)
})

