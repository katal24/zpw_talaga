var express = require('express');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true
});

var Schema = mongoose.Schema; // schema
var Task = new Schema({ // model
    project: String,
    description: String
});

var Task = mongoose.model('Task', Task);
var task = new Task();
task.project = 'Malowanie';
task.description = 'Pomalować rower na czerwono.';
task.save(function(err) {
    if (err) throw err;
    console.log('Zadanie zostało zapisane.');
});

var task2 = new Task();
task2.project = 'Malowanie';
task2.description = 'Tapetowanie na czerwono.';
task2.save(function(err) {
    if (err) throw err;
    console.log('Zadanie zostało zapisane.');
});

// var Task = mongoose.model('Task');
// Task.findById('5a12ae5068e4ce1836575c65', function(err, task) {
//     if (task) {
//         task.remove();
//         console.log("usuwam");
//     } else {
//         console.log("Nie ma takiego elementu do usunięcia");
//     }
// });

// var Task = mongoose.model('Task');
// Task.update({
//         _id: '5a12ae7914e6901857a5cdf9' // czego szukamy
//     }, {
//         description: 'Pomalować rower na zielono.' // co zmieniamy
//     }, {
//         multi: false
//     },
//     function(err, rows_updated) {
//         if (err) throw err;
//         console.log('Uaktualniono.');
//     }
// );

Task.find({
    'project': 'Malowanie'
}, function(err, tasks) {
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description + "\n");
    }
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function() {
    console.log("połączenie udane!");
});

app.get('/tasks', function(req, res) {
    console.log("Otrzymano żądanie GET dla strony głównej");
    Task.find({
        'project': 'Malowanie'
    }, function(err, tasks) {
        for (var i = 0; i < tasks.length; i++) {
            console.log('ID:' + tasks[i]._id);
            console.log(tasks[i].description + "\n");
        }
        res.send(tasks);
    });
});

app.post('/', function(req, res) {
    console.log("Otrzymano żądanie POST dla strony głównej");
    res.send('Hello POST');
});

app.delete('/usun', function(req, res) {
    console.log("Otrzymano żądanie DELETE dla strony /usun");
    res.send('Hello DELETE');
});

app.put('/user_list', function(req, res) {
    console.log("Otrzymano żądanie PUT dla strony /user_list");
    res.send('Lista użytkowników');
});

app.get('/ab*cd', function(req, res) { // wzorzec strony: abcd, abxcd, ab123cd, ...
    console.log("Otrzymano żądanie GET dla strony /ab*cd");
    res.send('Wzorzec strony dopasowany');
});

var server = app.listen(5000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port)
});