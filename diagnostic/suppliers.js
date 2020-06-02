module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getSupplier(res, mysql, context, complete){
        mysql.pool.query("SELECT Suppliers.supplierID, Suppliers.name, Address.addressLine1, Address.addressLine2, Address.city, Address.state Address.zip, Suppliers.phone, Suppliers.email FROM Suppliers, Addresses WHERE Supplier.addressID = Address.addressID ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.supplier = results;
            complete();
        });
    }

    /*Display all suppliers */

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteSupplier.js"];
        var mysql = req.app.get('mysql');
        getSupplier(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('supplier', context);
            }

        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedSupplier.js", "updateSupplier.js"];
        var mysql = req.app.get('mysql');
        getSupplier(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-supplier', context);
            }

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

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Suppliers SET name = ?, phone = ?, email = ? WHERE supplierID = ?;";
        var inserts = [req.body.name, req.body.phone, req.body.email, req.params.id];
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

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM supplers WHERE id = ?";
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
