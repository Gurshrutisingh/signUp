const express = require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https =require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function (req,res) {
    const firstName=req.body.first;
    const SecondName=req.body.second;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address : email,
                status :"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: SecondName
                }
            }
        ]
    }

    const jsonData= JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/c6d0dbb7aa";
    const options ={
        method: "POST",
        auth: "guru:21b15b4ce9413e1be0a03275c7a2dfe3-us21"
    }
    const request =https.request(url,options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failuer.html");
        }
      response.on("data",function (data) {
        console.log(JSON.parse(data));
      })
    })

    request.write(jsonData);
    request.end();
})

app.post("/fail",function (req,res) {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running");
})

//Api key
//21b15b4ce9413e1be0a03275c7a2dfe3-us21

//list id
//c6d0dbb7aa