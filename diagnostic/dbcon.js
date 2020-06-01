var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'palmejon',
  password        : 'Tokyes23*TK-421',
  database        : 'palmejon'
});

module.exports.pool = pool;