//importing modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");

var path = require('path'); //for deployment 

//instantiate express - call the constructor
var app = express();

const route = require("./route/routes");

//connect to mongodb for localhost
mongoose.connect("mongodb://localhost:27017/MyCart", {
  useNewUrlParser: true
});

//connect to mongodb for deployment -- copied the url from mlab after creation of db and user
//mongoose.connect("mongodb://Pavan:Pavan_1393@ds239157.mlab.com:39157/cartlist", {
//  useNewUrlParser: true
//});
//because of deprecations add useNewUrlParser to MongoClient.connect as a second param
//mongoose.connect("mongodb://localhost:27017/MyCart", {
//  useMongoClient: true
//});

//on connection
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

//on connection error
mongoose.connection.on("error", err => {
  console.log("Error while connecting to MongoDB" + err);
});

//server port
const PORT = 3000;//for localhost uncomment this
//const PORT = process.env.PORT || 8080; //for deployment


//adding middleware(routes all route to route.js) - cors for exchange data b/w 4200 and 3000 - two different ports
app.use(cors());

//body-parser
app.use(bodyparser.json());

//if there is request ending /api all will be redirected to routes.js
app.use("/api", route); //route is the instance we created above

//for deployment - start
/*app.use(express.static(path.join(
  __dirname,
  'public'
)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});*/
//for deployment - end

app.get("/", (req, res) => {
  res.send("Hello1");
});

app.listen(PORT, () => {
  console.log("App listening on port : " + PORT);
});