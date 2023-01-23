import mysql from "mysql";

export const db = mysql.createConnection({
  host: process.env.MY_SQL_DB_HOST,
  user: process.env.MY_SQL_DB_USER,
  password: process.env.MY_SQL_DB_PASSWORD,
  database: process.env.MY_SQL_DB_DATABASE,
});

db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL db is connected successfully!");
  }
});
