var mongoose = require('mongoose');

module.exports = {
    getOrders: getOrders,
    getOrdersByUsername: getOrdersByUsername,
    postOrder: postOrder,
    postOrders: postOrders,
    deleteOrder: deleteOrder,
    putOrder: putOrder
};

// ... schemat i model
var Schema = mongoose.Schema;
var Order = new Schema({
    numberOfProducts: Number,
    name: String,
    username: String,
    address: String,
    products: [],
    price: Number,
    isFinished: Boolean
});
var Order = mongoose.model('Order', Order);


function getOrders(req, res) {
    Order.find({}, (err, orders) => {
        if (err) throw err;
        res.send(orders);
    });
}

function getOrdersByUsername(req, res) {
    console.log("szukam dla: " + req.params.username);
    Order.find({ username: req.params.username }, (err, orders) => {
        if (err) throw err;
        console.log(orders);
        if (orders) {

            res.send(orders);
        } else {
            res.send([]);
        }
    });
}

function postOrder(req, res) {
    var order = new Order();

    order.numberOfProducts = req.body.numberOfProducts;
    order.name = req.body.name;
    order.username = req.body.username;
    order.address = req.body.address;
    order.products = req.body.products;
    order.price = req.body.price;
    order.isFinished = req.body.isFinished;

    order.save((err, order) => {
        if (err) throw err;
        res.send(order);
    });
}

function postOrders(req, res) {
    for (var i = 0; i < req.body.length; i++) {
        var order = new Order();

        order.numberOfProducts = req.body[i].numberOfProducts;
        order.name = req.body[i].name;
        order.username = req.body[i].username;
        order.address = req.body[i].address;
        order.products = req.body[i].products;
        order.price = req.body[i].price;
        order.isFinished = req.body[i].isFinished;


        order.save((err, order) => {
            if (err) throw err;
        });
    }
}

function deleteOrder(req, res) {
    var id = req.params.id;
    Order.findById(id, function(err, order) {
        if (order) {
            order.remove();
            res.send(order);
        } else {
            console.log("Nie ma takiego zamówienia do usunięcia");
            res.send(err);
        }
    });
}

function putOrder(req, res) {
    var id = req.params.id;
    Order.update({
            _id: id // czego szukamy
        }, {
            numberOfProducts: req.body.numberOfProducts,
            name: req.body.name,
            username: req.body.username,
            address: req.body.address,
            products: req.body.products,
            price: req.body.price,
            isFinished: req.body.isFinished
        }, {
            multi: false
        },
        function(err, rows_updated) {
            if (err) throw err;
            console.log(rows_updated);
            res.send(true);
        }
    );
}