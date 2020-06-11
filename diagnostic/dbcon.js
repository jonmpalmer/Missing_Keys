var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_palmejon',
  password        : '3293',
  database        : 'cs340_palmejon'
});

module.exports.pool = pool;
