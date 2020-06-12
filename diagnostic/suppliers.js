module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getSuppliers(res, mysql, context, complete){
        mysql.pool.query("SELECT supplierID, name, phone, email FROM Suppliers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.suppliers = results;
            complete();
        });
    }
    
    function getSupplier(res, mysql, context, supplierID, complete){
        var sql = "SELECT supplierID, name, phone, email FROM Suppliers WHERE supplierID = ?";
        var inserts = [supplierID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.supplier = results[0];
            complete();
        });
    }

    /*Display all suppliers */

    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["deleteSupplier.js"];
        var mysql = req.app.get('mysql');
        getSuppliers(res, mysql, context, complete);
        function complete(){
            res.render('suppliers', context);
        }
    });

    router.get('/:supplierID', function(req, res){
        var context = {};
        context.jsscripts = ["updateSupplier.js"];
        var mysql = req.app.get('mysql');
        getSupplier(res, mysql, context, req.params.supplierID, complete);
        function complete(){
            res.render('update-supplier', context);
        }
    });

    /* Adds an supplier */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Suppliers (addressID, name, phone, email) VALUES (?,?,?,?)";
        var inserts = [req.body.addressID, req.body.name, req.body.phone, req.body.email];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/supplers');
            }
        });
    });

    /* The URI that update data is sent to in order to update a suppler */

    router.put('/:supplierID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Suppliers SET name = ?, phone = ?, email = ? WHERE supplierID = ?;";
        var inserts = [req.body.name, req.body.phone, req.body.email, req.params.supplierID];
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

    /* Route to delete an suppler*/

    router.delete('/:supplierID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM supplers WHERE supplierID = ?";
        var inserts = [req.params.supplierID];
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
