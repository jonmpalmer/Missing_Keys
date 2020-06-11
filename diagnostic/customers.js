module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID, firstName, lastName, phone, email FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }
    
    function getCustomer(res, mysql, context, id, complete){
        var sql = "SELECT customerID, firstName, lastName, phone, email FROM Customers WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }

    /*Display all customers*/

    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["deleteCustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            res.render('customer', context);
        }
    });

    router.get('/:id', function(req, res){
        var context = {};
        context.jsscripts = ["selectedCustomer.js", "updateCustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('update-customer', context);
        }
    });

    /* Adds a customer*/

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (addressID, firstName, lastName, phone, email) VALUES (?,?,?,?,?)";
        var inserts = [req.body.addressID, req.body.firstName, req.body.lastName, req.body.phone, req.body.email];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customers');
            }
        });
    });

    /* The URI that update data is sent to in order to update a customer */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Customers SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE customerID = ?;";
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

    /* Route to delete a customer, returns a 202 upon success. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customers WHERE id = ?";
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
