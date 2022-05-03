//required packages

const express = require("express");
const res = require("express/lib/response");
const fetch = require("node-fetch");
const { title } = require("process");
require("dotenv").config();

//create the express server
const app = express();

//server port Number
const PORT = process.env.PORT || 3000;


//set temlate engine
app.set("view engine","ejs");
app.use(express.static(public));

//needed to parse html data for post request
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/convert-mp3", (req, res) => {
    const videoID = req.body.videoID;
   if(
       videoID === undefined ||
       videoID === "" ||
       videoID === null
   ){
       return res.render("index", {success : false,message : "Please enter a video ID"});
   }else{
       const fetchAPI =await fetch(`youtube-mp36.p.rapidapi.com?id=${videoID}`,{
           "method" : "GET",
           "headers" : {
               "x-rapidapi-key" :process.env.API_KEY,
               "x-rapidapi-host" : process.env.API_HOST
           }
       });
    const fetchResponse = await fetchAPI.json();
    if(fetchResponse.status === "ok")
        return res.render("index", {success : true, song_title: fetchResponse.title,
             song_link : fetchResponse.link});
             else 
             return res.render("index", {success: false,message : fetchResponse.msg})
   }
})


//start the server 
app.listen(PORT,() => {
	console.log(`server started on port ${PORT}`);
})
