module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProducts(res, mysql, context, complete){
        mysql.pool.query("SELECT name, type, model, description, quant, price FROM Products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products = results;
            complete();
        });
    }
        
    function getProduct(res, mysql, context, customerID, complete){
        var sql = "SELECT name, type, model, description, quant, price FROM Products WHERE productID = ?";
        var inserts = [productID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results[0];
            complete();
        });
    }

    /*Display all products */

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteProduct.js"];
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        function complete(){
            res.render('products', context);
        }
    });

    router.get('/:productID', function(req, res){
        var context = {};
        context.jsscripts = ["selectedProduct.js", "updateProduct.js"];
        var mysql = req.app.get('mysql');
        getProduct(res, mysql, context, req.params.productID, complete);
        function complete(){
            res.render('update-products', context);
        }
    });

    /* Adds an product */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Products (productID, supplierID, name, type, model, description, quant, price) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.productID, req.body.supplierID, req.body.name, req.body.type, req.body.model, req.body.descrpition, req.body.quant, req.body.price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/products');
            }
        });
    });

    /* The URI that update data is sent to in order to update a product */

    router.put('/:productID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Products SET name = ?, type = ?, model = ?, description = ?, quant = ?, price = ? WHERE productID = ?;";
        var inserts = [req.body.name, req.body.type, req.body.model, req.body.description, req.body.quant, req.body.price, req.params.productID];
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

    /* Route to delete a product*/

    router.delete('/:productID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Products WHERE productID = ?";
        var inserts = [req.params.productID];
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
