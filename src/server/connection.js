const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,         //port: 3306 on XAMPP  Or  8889 on MAMP
    user: "root",
    password: "",   //password: "" on XAMPP or root on MAMP
    database: "db_fullstack_final"
});

conn.connect(err => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to database');
  });
  
// conn.connect();
module.exports = conn;