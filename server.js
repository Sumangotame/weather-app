const bodyParser = require("body-parser")
const https = require("https")
const express = require("express")
const app = express()
app.use(bodyParser.urlencoded({extended : true}))
const port=4000
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})
app.post("/",(req,res)=>{
    const query = req.body.cityName
    const apiKey= "0e300ab3b22069cb80237588c8318bac"
    const unit= "metric"
    const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ unit
    https.get(url,(response)=>{
     console.log(response);
     response.on("data",(data)=>{
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        res.write("<p>The weather is currently: "+weatherDescription+"</p>")
        res.write("<h1>the temperature in " + query + " is: "+temp+" degree celsious</h1>")
        res.write("<img src="+imageUrl+">")
        res.send()
    })
 })
})

app.listen(port,()=>{
    console.log(`server is listening at port: ${port}`);
})
