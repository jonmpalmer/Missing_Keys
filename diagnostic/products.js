module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProduct(res, mysql, context, complete){
        mysql.pool.query("SELECT Products.name, Products.type, Products.model, Products.description, Products.quant, Products.price, Products.image, Suppliers.supplierID, Suppliers.name FROM Products, Suppliers WHERE (Products.supplierID = Suppliers.supplierID", function(error, results, fields){
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
        context.jsscripts = ["deleteProduct.js"];
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
        var sql = "INSERT INTO Products (supplierID, name, type, model, description, quant, price, image) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.supplierID, req.body.name, req.body.type, req.body.model, req.body.descrpition, req.body.quant, req.body.price, req.body.image];
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

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Products SET name = ?, type = ?, model = ?, description = ?, quant = ?, price = ?, image = ? WHERE productsID = ?;";
        var inserts = [req.body.name, req.body.type, req.body.model, req.body.description, req.body.quant, req.body.price,req.body.image req.params.id];
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

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM products WHERE id = ?";
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
