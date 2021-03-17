const { reduce } = require('async')
const express = require(`express`)
const request = require('request')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

//Middleware
//This tells which template engine to use
app.set("view engine", "ejs")

//Routing
app.get('/', (req, res) =>{
    res.render("home")
})

app.get('/result', (req, res) =>{
    //res.send(`You searched for ${req.query.movieName}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
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

app.get("/specific/:id", (req, res)=>{
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, (error, response, body)=>{
        if(!error && response.statusCode===200){
            const data = JSON.parse(body)
            //res.send(data)
            res.render("specific", {specSheet: data})
        }
        else{
            res.send("Something's not right!")
        }
    })
})

// app.get('/student/:rollno', (req, res) =>{
//     res.send(`You are viewing record of ${req.params.rollno}`)
// })

app.get("*", (req, res)=>{
    res.send("404 NOT FOUND")
})

app.listen(3000, () =>{
    console.log("Server kicked in!")
})
