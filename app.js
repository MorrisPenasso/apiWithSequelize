﻿var express = require("express");
var app = new express();
var db = require("./db.js");


var bodyParser = require("body-parser");
app.use(bodyParser.json()); //body-parser extract the entire body portion and exposes it on req.body 


//sync database with the model ( stored model into db )
db.sequelize.sync().then(function () {

    console.log("Database started");
})


app.get("/", function (req, res) {

    res.send("Hello!! Welcome into my application");

});


// search an existing person with id
app.get("/findPerson/:id", function (req, res) {

    var id = parseInt(req.params.id, 10);

    //search by id
    db.model.find({
        where: {
            id: id
        }
    }).then(function (data) {
        if (!data) {
            res.status(404).send("This person is not exist");
        } else {
            console.log("Person matched");
            res.send(data.toJSON());
        }
    });
});

// search an existing person with query into URL Request
app.get("/findPerson", function (req, res) {

    var query = req.query;
    var queryAttrs = {};

    if (query.name) {
        queryAttrs.name = query.name;
    }

    if (query.description) {
        queryAttrs.description = {
            $like: "%" + query.description + "%"
        }
    }
    if (query.person == "true") {
        queryAttrs.person = true;
    } else if (query.person == "false") {
        queryAttrs.person = false;
    }

    db.model.findAll({
        where: queryAttrs
    }).then(function (data) {

        if (data) {
            res.send(data);
        } else {
            res.status(404).send("This person is not exist");
        }
    })
})

// insert new person into sequelize database
app.post("/insertPerson", function (req, res) {

    var data = req.body;

    db.model.create({
        name: data.name,
        description: data.description,
        person: data.person
    }).then(function (todos) {

        console.log(todos.toJSON());
    })
});

// delete existing person into sequelize database
app.delete("/deletePerson/:id", function (req, res) {

    var id = parseInt(req.params.id, 10);

    db.model.destroy({ //delete with destroy istruction of sequelize
        where: {
            id: id  // delete id that is equal to id that i passed into URL request
        }
    }).then(function (data) {
        console.log("Person deleted");
        res.sendStatus(200).send(data);
    });
});

app.listen(8080);