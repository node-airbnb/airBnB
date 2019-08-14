
//The below code imports the express package into our app.js file.
const express= require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session');


//This line connects mongoose to our mongoDB database
mongoose.connect('mongodb://localhost:27017/airBnb', {useNewUrlParser: true})
.then( ()=>
{
  console.log(`The application is connected to the mongo db database`)
})
.catch( (err)=>
{
    console.log(`The mongo db failed to connect because ${err}`);
});

//import routes
const generalRoute = require("./routes/General");
const userRoute = require("./routes/user");  
const roomRoute = require("./routes/room");


//This creates an express object that which initializes our project
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//This forces express to set handlebars as it's template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//This code is needed to load all static files (images,css,js)
app.use(express.static('public'))


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use((req,res,next)=>
{
    res.locals.userInfo= req.session.userInfo;

    next();


});



//Routes

app.use("/",generalRoute);
app.use("/user",userRoute); //object
app.use("/room",roomRoute);

const port=5000;
app.listen(port,()=>{
    console.log("Web Sever is connected")

});