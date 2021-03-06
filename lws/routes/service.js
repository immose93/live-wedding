var express = require('express');
var router = express.Router();

module.exports = function (session){
    router.get('/apply', function(req, res, next) {
        if(typeof req.user === 'undefined'){
            res.redirect('/auth');
        }
        else {
            res.render('service_apply');
        }
    });

    router.get('/introduce', function(req, res, next) {
        res.render('service_introduce');
    });

    return router;
};