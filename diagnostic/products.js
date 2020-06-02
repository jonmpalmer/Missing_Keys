module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProduct(res, mysql, context, complete){
        mysql.pool.query("", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results;
            complete();
        });
    }

    /*Display all products */

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteproduct.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('product', context);
            }

        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedProduct.js", "updateProduct.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-product', context);
            }

        }
    });

    /* Adds an product */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO  VALUES (?,?,?,?,?)";
        var inserts = [req.body.addressID, req.body.firstName, req.body.lastName, req.body.phone, req.body.email];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/products');
            }
        });
    });

    /* The URI that update data is sent to in order to update an product */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE products";
        var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete an order*/

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM orders WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
