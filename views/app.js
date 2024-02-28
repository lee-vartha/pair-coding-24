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

// if the url is host:port/new-entry, it will push the new entry to the entries array
app.post("/new-entry", (req,res) => {
    if(!req.body.title || !req.body.body){
        res.status(400).send("all the entries must have a title and a body")
        return;
    }
    // push new entry to the entries array
    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    })
    res.redirect("/");
})

app.use((req,res) => {
    res.status(400).render("404");
})


