const dotenv = require('dotenv').config()
const Mongoclient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const flightlogRoutes = require('./server/src/routes/flightlog.route')
const userRoutes = require('./server/src/routes/auth.route')
const path = require('path')

app.use(cors({credentials:true, origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use("/api/flightlogs", flightlogRoutes)
app.use("/api/users", userRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build")); // change this if your dir structure is different
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
else {
    app.get("/", (req, res)=>{
        res.send("App is Working");
    })
}

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log(`Connection is successful`)
        app.listen(5000)
    })
    .catch((error)=>{
        console.log(error)
    })

