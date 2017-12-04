var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

module.exports = {
    logout: logout,
    getUsers: getUsers,
    getUser: getUser,
    postUser: postUser,
    postUsers: postUsers,
    deleteUser: deleteUser,
    putUser: putUser
};

var User = require('./user.model');


function logout(req, res) {
    console.log("wylogowuje");
    req.logout();
    res.redirect('/users/login');
    console.log("wylogowałem");
}

function getUsers(req, res) {
    console.log("getUsers");
    User.find({}, (err, users) => {

        console.log("getUsers");
        res.send(users);
    });
}

function getUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send(null);
        } else {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) throw err;
                if (result) {
                    res.send(user);
                } else {
                    res.send(null);
                }
            });
        }
    });
}

function postUser(req, res) {
    var user = new User();

    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.role = req.body.role;

    user.save((err, user) => {
        if (err) throw err;
        res.send(user);
    });
}

function postUsers(req, res) {
    for (var i = 0; i < req.body.length; i++) {
        var user = new User();

        user.username = req.body[i].username;
        user.password = req.body[i].password;
        user.role = req.body[i].role;

        user.save((err, user) => {
            if (err) throw err;
        });
    }
}

function deleteUser(req, res) {
    var id = req.params.id;
    console.log(id);
    User.findById(id, function(err, user) {
        if (err) console.log(err);
        if (user) {
            console.log(user);
            user.remove();
            res.send(true);
        } else {
            console.log("Nie ma takiego usera do usunięcia");
            res.send("Nie ma takiego usera do usunięcia o id");
        }
    });
}

function putUser(req, res) {
    var id = req.params.id;
    User.update({
            _id: id // czego szukamy
        }, {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        }, {
            multi: false
        },
        function(err, rows_updated) {
            if (err) throw err;
            console.log(true);
            res.send('Uaktualniono user o id=' + id);
        }
    );
}