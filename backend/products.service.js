var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var fs = require('fs');

module.exports = {
    postImages: postImages,
    deleteImage: deleteImage,
    getProducts: getProducts,
    getProduct: getProduct,
    postProduct: postProduct,
    postProducts: postProducts,
    deleteProduct: deleteProduct,
    putProduct: putProduct
};

// model
var Product = require('./product.model');

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) throw err;
        res.send(products);
    });
}

function getProduct(req, res) {
    Product.find({ _id: req.params.id }, (err, product) => {
        if (err) throw err;
        res.send(product[0]);
    });
}


function postProduct(req, res) {
    console.log("post product");
    var product = new Product();
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    product.promotion = req.body.promotion;
    product.number = req.body.number;

    product.save((err, product) => {
        if (err) throw err;
        res.send(product);
    });
}

function postImages(req, res) {
    console.log("postImages");
    console.log(req.files);
    let username = req.params.username;
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image;
    let name = username + "_" + req.files.image.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/' + name, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send(name);
    });

}


function deleteImage(req, res) {
    console.log("delete Image: " + req.body.name);
    console.log(req.files);
    let name = req.body.name;

    fs.unlink("./public/" + name, (err) => {
        if (err) {
            console.log("failed to delete local image:" + err);
        } else {
            console.log('successfully deleted local image');
        }
    });
}

function postProducts(req, res) {
    for (var i = 0; i < req.body.length; i++) {
        var product = new Product();

        product.name = req.body[i].name;
        product.category = req.body[i].category;
        product.description = req.body[i].description;
        product.price = req.body[i].price;
        product.promotion = req.body[i].promotion;
        product.number = req.body[i].number;

        product.save((err, product) => {
            if (err) throw err;
        });
    }
}

function deleteProduct(req, res) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) throw err;
        if (product) {
            product.remove();
            console.log("Usunięto produkt o id=" + id);
            res.send(true);
        } else {
            console.log("Nie ma takiego produktu do usunięcia");
            res.send("Nie ma takiego produktu do usunięcia o id=" + id);
        }
    });
}

function putProduct(req, res) {
    console.log("putt product");
    let id = req.params.id;
    var images1 = [];
    fs.readdir('./public', (err, files) => {
        console.log("read folder");
        if (err) console.log(err);
        images1 = files.filter(file => file.indexOf(id) >= 0);
        console.log(files);
        console.log(images1);

        Product.update({
                _id: id // czego szukamy
            }, {
                name: req.body.name, // co zmieniamy
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                promotion: req.body.promotion,
                number: req.body.number,
                images: images1
            }, {
                multi: false
            },
            function(err, rows_updated) {
                if (err) throw err;
                console.log('Uaktualniono product o id=' + id);
                console.log(images1);
                res.send(rows_updated);
            }
        );
    });

}