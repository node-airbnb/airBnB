
//The below code imports the express package into our app.js file.
const express= require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


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


//This creates an express object that which initializes our project
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//This forces express to set handlebars as it's template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//This code is needed to load all static files (images,css,js)
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, "public"))); // <- this line will us public directory as your static assets

// app.use("/styles/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Routes

app.use("/",generalRoute);

app.use("/user",userRoute); //object

const port=5000;
app.listen(port,()=>{
    console.log("Web Sever is connected")

});