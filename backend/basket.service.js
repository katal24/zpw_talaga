var mongoose = require('mongoose');

module.exports = {
    getBasketsByUsername: getBasketsByUsername,
    postBasket: postBasket,
    deleteBasket: deleteBasket,
    deleteOrder: deleteOrder
};

// ... schemat i model
var Schema = mongoose.Schema;
var Basket = new Schema({
    orderedProducts: [],
    username: String
});
var Basket = mongoose.model('Basket', Basket);


function getBasketsByUsername(req, res) {
    console.log("szukam koszyka dla: " + req.params.username);
    Basket.find({ username: req.params.username }, (err, baskets) => {
        if (err) throw err;
        console.log(baskets);
        if (baskets) {
            res.send(baskets[0].orderedProducts);
        } else {
            res.send([]);
        }
    });
}

function postBasket(req, res) {
    let username = req.body.username;
    let orderedProducts = req.body.orderedProducts;
    Basket.find({ username: username }, function(err, basket) {
        console.log("basket");
        console.log(basket);
        if (basket.length) {
            console.log("update");
            updateBasket(username, orderedProducts);
            res.send(basket);
        } else {
            createBasket(username, orderedProducts, res);
            console.log("create");
        }
    });

}

function deleteBasket(req, res) {
    Basket.find({ username: req.params.username }, function(err, basket) {
        if (basket) {
            basket.forEach(function(element) {
                element.remove();
            }, this);
            // basket.remove();
            res.send(basket);
        } else {
            console.log("Nie ma takiego basketu do usunięcia");
            res.send(err);
        }
    });
}


function deleteOrder(req, res) {
    var id = req.params.id;
    Basket.findById(id, function(err, order) {
        if (order) {
            order.remove();
            res.send(order);
        } else {
            console.log("Nie ma takiego zamówienia do usunięcia");
            res.send(err);
        }
    });
}


function createBasket(username, orderedProducts, res) {
    var basket = new Basket();

    basket.orderedProducts = orderedProducts;
    basket.username = username;

    basket.save((err, basket) => {
        if (err) throw err;
        res.send(basket);
    });
}

function updateBasket(username, orderedProducts) {
    console.log(orderedProducts);
    Basket.update({
            username: username
        }, {
            orderedProducts: orderedProducts,
        }, {
            multi: false
        },
        function(err, rows_updated) {
            if (err) throw err;
            console.log(rows_updated);
        }
    );
}