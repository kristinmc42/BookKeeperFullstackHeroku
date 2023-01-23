import mysql from "mysql";

export const db = mysql.createConnection({
  host: process.env.MY_SQL_DB_HOST || process.env.MYSQLHOST,
  user: process.env.MY_SQL_DB_USER || process.env.MYSQLUSER,
  password: process.env.MY_SQL_DB_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.MY_SQL_DB_DATABASE || process.env.MYSQLDATABASE,
});

db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL db is connected successfully!");
  }
});
