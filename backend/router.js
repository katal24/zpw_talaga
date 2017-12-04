var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./user.model');
var productService = require('./products.service');
var orderService = require('./orders.service');
var userService = require('./users.service');
var basketService = require('./basket.service');

module.exports = router;


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, user, { message: 'Unknown User' });
            } else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) throw err;
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/images/:username', productService.postImages);
router.post('/images', productService.deleteImage);
router.get('/products', productService.getProducts);
router.get('/products/:id', productService.getProduct);
router.post('/products', requiresLogin, productService.postProduct);
router.post('/products-array', requiresLogin, productService.postProducts);
router.delete('/products/:id', requiresLogin, productService.deleteProduct);
router.put('/products/:id', requiresLogin, productService.putProduct);

router.get('/orders', requiresLogin, orderService.getOrders);
router.get('/orders/:username', requiresLogin, orderService.getOrdersByUsername);
router.post('/orders', orderService.postOrder);
router.post('/orders-array', requiresLogin, orderService.postOrders);
router.delete('/orders/:id', requiresLogin, orderService.deleteOrder);
router.put('/orders/:id', requiresLogin, orderService.putOrder);

router.get('/basket/:username', requiresLogin, basketService.getBasketsByUsername);
router.post('/basket', requiresLogin, basketService.postBasket);
router.delete('/basket/:id', requiresLogin, basketService.deleteOrder);

router.post('/users/login', passport.authenticate('local', { failureRedirect: '/authentication' }), userService.getUser);
router.post('/users/register', userService.postUser);
router.get('/users/logout', requiresLogin, userService.logout);
router.get('/users', requiresLogin, userService.getUsers);
router.post('/users', userService.postUser);
router.post('/users-array', userService.postUsers);
router.delete('/users/:id', requiresLogin, userService.deleteUser);
router.put('/users/:id', requiresLogin, userService.putUser);

function requiresLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log("wymagana autentykacja");
        res.send("brak autentykacji");
    }
}