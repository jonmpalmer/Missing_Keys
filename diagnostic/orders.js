module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrder(res, mysql, context, complete){
        mysql.pool.query("", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            complete();
        });
    }

    /*Display all orders */

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {"SELECT Orders.orderID, Orders.customerID, Orders.orderDate, Orders.shippedDate, Orders.total, OrderItems.productID, OrderItems.orderDate, OrderItems.quant, Products.name, Products.price FROM Orders, OrderItems, Products WHERE (Orders.orderID = OrderItems.orderID AND orderID = :orderSearch)"};
        context.jsscripts = ["deleteOrder.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('order', context);
            }

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
                res.render('update-order', context);
            }

        }
    });

    /* Adds an order */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders VALUES (?,?,?,?,?)";
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

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Orders";
        var inserts = [req.body.orderID, req.body.customerID, req.body.orderDate, req.body.shippedDate, req.body.total, req.params.id];
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
