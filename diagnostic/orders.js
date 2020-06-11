module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID, customerID, orderDate, shippedDate, total FROM Orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }
        
    function getOrder(res, mysql, context, orderID, complete){
        var sql = "SELECT SELECT orderID, customerID, orderDate, shippedDate, total FROM Orders WHERE orderID = ?";
        var inserts = [orderID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results[0];
            complete();
        });
    }


    /*Display all orders */

    router.get('/', function(req, res){
        var context = {"SELECT orderID, customerID, orderDate, shippedDate, total FROM Orders WHERE orderID = ?"};
        context.jsscripts = ["deleteOrder.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, complete);
        function complete(){
            res.render('orders', context);
        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectOrder.js", "updateOrder.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('updateOrder', context);
            }

        }
    });

    /* Adds an order */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (orderID, customerID, orderDate, shippedDate, total) VALUES (?,?,?,?,?)";
        var inserts = [req.body.orderID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orders');
            }
        });
    });

    /* The URI that update data is sent to in order to update an order */

    router.put('/:orderID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Orders";
        var inserts = [req.body.orderID, req.body.orderID, req.body.orderDate, req.body.shippedDate, req.body.total, req.params.orderID];
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

    router.delete('/:orderID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM orders WHERE orderID = ?";
        var inserts = [req.params.orderID];
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
