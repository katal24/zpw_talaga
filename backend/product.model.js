var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Product = new Schema({
    name: String,
    category: String,
    description: String,
    price: String,
    promotion: Number,
    number: Number,
    images: []
});
Product.virtual('id').get(function() {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
Product.set('toJSON', {
    virtuals: true
});
var Product = mongoose.model('Product', Product);
module.exports = Product;