const { reduce } = require('async')
const express = require(`express`)
const request = require('request')
const app = express()

//Middleware
//This tells which template engine to use
app.set("view engine", "ejs")

//Routing
app.get('/', (req, res) =>{
    // res.send("Home Page")
    res.render("home")
})

app.get('/result', (req, res) =>{
    //res.send(`You searched for ${req.query.movieName}`)
    const url = `http://www.omdbapi.com/?apikey=6b526811&s=${req.query.movieName}`
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            const data = JSON.parse(body)
            // res.send(data)
            res.render("result", {moviesDump: data})
        }
        else{
            res.send("Something's not right!")
        }
    })

})

// app.get('/student/:rollno', (req, res) =>{
//     res.send(`You are viewing record of ${req.params.rollno}`)
// })

app.listen(3000, () =>{
    console.log("Server kicked in!")
})
