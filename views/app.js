// requires
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");


// init express as application
const app = express();


// define entries as global array
const entries = []
app.locals.entries = entries;

// set the current dir 
app.set("views", path.resolve(__dirname, "views"));

// define the render as ejs
app.set("view engine", "ejs");


// body parser to automatically set the html header type
// arguments ignore encoding the url extension
app.use(bodyParser.urlencoded({ extended: false }));

// renders the index ejs file

app.get("/", (req, res) => {
    res.render("index")
});

// if the url is /new-entry it renders the new-entry ejs file
app.get("/new-entry", (req,res) => {
    res.render("new-entry");
})