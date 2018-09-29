var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');
var path = require('path');
// var config = require('./config');




(() =>{
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public', 'views')));
        app.use(express.static(path.join(__dirname, 'public/javascripts/index.js')));
        app.use(express.static(path.join(__dirname, 'public/javascripts/event.js')));
        app.use(express.static(path.join(__dirname, 'build')));
        app.use(express.static('public'));
        app.use(cors());
    
      
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname + '/views/index.html'));
        });
        
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
            next();
        });
    
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    
        // error handler
        app.use(function (err, req, res, next) {
            return res.status(err.status || 500).json({ success: false, msg: err });
        });
})();

// function initApp() {

// }
module.exports = app;