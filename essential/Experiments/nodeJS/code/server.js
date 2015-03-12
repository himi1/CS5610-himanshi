var express = require('express');
var app = express();
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

//  Environment variable
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// courses - List of Courses
var courses = [
    { courseName: "CS5610", desc: "Web Development", hpw: 20 },
    { courseName: "CS5010", desc: "PDP", hpw: 40 },
    { courseName: "CS5800", desc: "Algorithms", hpw: 15 },
    { courseName: "CS5500", desc: "Managing Software Development", hpw: 10 },
    { courseName: "CS5600", desc: "Computer Systems", hpw: 25 },
    { courseName: "CS5400", desc: "Principles of Programming Languages", hpw: 20 },
    { courseName: "CS6410", desc: "Compilers", hpw: 25 },
    { courseName: "CS6515", desc: "Software Development", hpw: 20 },
    { courseName: "CS6510", desc: "Advanced Software Development", hpw: 20 }
];

// get
app.get('/', function (req, res) {
    res.send('Hello. Welcome to my OpenShift Page.');
});

app.get("/api/courses", function (req, res) {
    res.json(courses);
});

app.get("/api/courses/:idx", function (req, res) {
    res.json(courses[req.params.idx]);
});

// Delete
app.delete("/api/courses/:id", function (req, res) {
    courses.splice(req.params.id, 1);
    res.json(courses);
});

// Post
app.post("/api/courses", function (req, res) {
    courses.push(req.body);
    res.json(courses);
});

// Put
app.put("/api/courses/:id", function (req, res) {
    courses[req.params.id] = req.body;
    res.json(courses);
});

app.listen(port, ip);


