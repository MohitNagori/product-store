var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "db-personal.cpbflakq2y2m.ap-south-1.rds.amazonaws.com",
  user     : "admin",
  password : "Mohit#123",
  port     : "3306",
  database : "db_product"
});

function fetchProducts(filterQuery, callback) {
  let query = 'SELECT * FROM Product';
  console.log(filterQuery);
  if (filterQuery && (filterQuery.indexOf('BELOW') !== -1 || filterQuery.indexOf('ABOVE') !== -1
    || filterQuery.indexOf('OR') !== -1 || filterQuery.indexOf('AND') !== -1)) {
      query += ' WHERE ';

    if (filterQuery.indexOf('BELOW') !== -1) {
      const belowPrice = parseInt(filterQuery.split('BELOW')[1].trim().split(' ')[0].trim());
      query += ' price < ' + belowPrice + ' ';  
    } 
    if (filterQuery.indexOf('ABOVE') !== -1) {
      const abovePrice = parseInt(filterQuery.split('ABOVE')[1].trim().split(' ')[0].trim());
      query += ' price > ' + abovePrice + ' ';  
    } 

    filterQuery = filterQuery.split('ABOVE')[0].split('BELOW')[0];
    if (query.indexOf('>') !== -1 || query.indexOf('<') !== -1) {
      query += ' AND '
    }

    if (filterQuery.indexOf('OR') !== -1) {
      const orQueries = filterQuery.split('OR');
      orQueries.forEach((orQuery, orIndex) => {
        orQuery = orQuery.trim();
        if (orIndex == 0) query += ' ( ';
        const andQueries = orQuery.split('AND');
        andQueries.forEach((andQuery, andIndex) => {
          andQuery = andQuery.trim();
          if (andIndex == 0) query += ' ( ';
          query += ` lower(title) LIKE '%${andQuery.trim().toLowerCase()}%'`;
          if (andIndex == andQueries.length - 1) query += ' ) ';
          else query += ' AND ';
        });
        if (orIndex === orQueries.length - 1) query += ' ) ';
        else query += ' OR ';
      });
    } 
  }
  console.log(query);
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.error('Database connection failed: ' + err.stack);
      callback('Unable to fetch products');     
    } else {
      callback(undefined, results);  
    }
  });     
}

module.exports = fetchProducts;