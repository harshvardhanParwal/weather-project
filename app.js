const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="693c0ebdea48c66e612fbe985205eefd";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
  https.get(url,function(response){
    console.log("status code:"+response.statusCode);
    response.on("data",function(data){
      // console.log(data);                 data will be in hexadecimal code
      const weatherData=JSON.parse(data);  // for converting json into an actual js object.
      // console.log(weatherData);          data will be in js object
      const temp=weatherData.main.temp;
      const weatherDesc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temprature in "+query+" is: "+temp+"</h1>");
      res.write("<p>The weather is currently: "+weatherDesc+"</p>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})
app.listen(3000,function(){
  console.log("server started at on port 3000");
})
