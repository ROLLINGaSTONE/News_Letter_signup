const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()

const PORT = process.env.PORT || 5000

//to make static files public
app.use(express.static("public"))

//grab data and send it to the client or console.log it.
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(request, res){
    res.sendFile(__dirname  + "/signup.html")

})
//handles post request and send it the client
app.post("/", function(req, res){

    // console.log(req.body.FirstName)'
   const FirstName  = req.body.FirstName
   const LastName  = req.body.LastName
   const email = req.body.email


   const data = {

    members:[

        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:FirstName,
                LNAME:LastName
            }

        }

    ]



   }


   const json_data = JSON.stringify(data)
   const url = 'https://us6.api.mailchimp.com/3.0/lists/789b1469e1'

   
   const options = {
        method:"POST",
        auth:"Evans1:a5b47887f2e678e29da4f3b1fe5fa62c-us6"
       }
       
   
    

   const request = https.request(url, options, function(response){

    if (response.statusCode === 200 ){

        res.sendFile(__dirname + "/success.html")

    }else{
        res.sendFile(__dirname + "/failure.html")

    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
   })
   
   request.write(json_data)
   request.end();
})

//server
app.listen(PORT ,()=>{

    console.log(`Port started at port http://localhost${PORT}`);
})



// apiKey

// a5b47887f2e678e29da4f3b1fe5fa62c-us6


// Id
// 789b1469e1