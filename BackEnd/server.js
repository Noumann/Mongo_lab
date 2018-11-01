var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//mongoose data here
const mongoose = require('mongoose');
const mongoDB = 'mongodb://nouman:nouman123@ds255970.mlab.com:55970/lab_with_mongodb';
mongoose.connect(mongoDB);

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: String,
    content: String
});

//database 
const PostModel = mongoose.model('postA', PostSchema);


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
app.post('/name', function (req, res) {
    res.send("Hello you sent " +
        req.body.firstname + " " +
        req.body.lastname);
})

app.get('/', function (req, res) {
    res.send('Hello from Express');
})
*/
app.post('/api/posts', function (req, res) {
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);

    //test
    PostModel.create({
        title: req.body.title,
        content: req.body.content
    })
})

app.get('/api/posts', function (req, res) {
    PostModel.find(function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
})

app.get('/getposts/:title', function (req, res) {
    console.log("Get " + req.params.title + " Post");
    PostData.findOne({ 'title': req.params.title },
        function (err, data) {
            if (err)
                return handleError(err);
            res.json(data);
        });
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})