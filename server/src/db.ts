import mysql from "mysql"

console.log(process.env.MY_SQL_DB_HOST)

export const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  debug: true
});


db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL db is connected successfully!");
  }
});
