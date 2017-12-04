var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var router = require('./router');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fileUpload = require('express-fileupload');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var productService = require('./products.service');
var orderService = require('./orders.service');
var userService = require('./users.service');

var User = userService.User;
var Product = require('./product.model');
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
express.static('public', []);
app.use(express.static('public'));
app.use(fileUpload());
app.use(router);


// test połączenia z bazą
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia z bazą...'));
db.once('open', function() {
    console.log("połączenie z bazą udane!");
});


io.on('connection', function(socket) {
    console.log("tu przyjmuje od klienta COS");
    socket.on('message', function() {
        console.log("klient przyszedl");
        io.sockets.emit('message', { msg: ' clients connected!' });
    });
    socket.on('createPromotion', (data) => {
        io.sockets.emit('createPromotion', { ids: data.ids, promotion: data.promotion })
        setTimeout(() => {
            io.sockets.emit('deletePromotion');
        }, data.time * 1000);
    });
});

http.listen(5000, _ => {
    console.log("chodze na 5000");
});