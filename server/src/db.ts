import mysql from "mysql"


// export const db = mysql.createConnection({
  //   host: process.env.MYSQLHOST,
  //   user: process.env.MYSQLUSER,
  //   password: process.env.MYSQLPASSWORD,
  //   database: process.env.MYSQLDATABASE,
  //   debug: true,
  //   trace: true
  // });
  
//   console.log(process.env.MY_SQL_DB_HOST)
//   console.log(process.env.MYSQLHOST)
// console.log(process.env.MYSQL_URL)
// console.log(process.env.DATABASE_URL)

// declare variable typescript namespace
export const db = mysql.createConnection(process.env.DATABASE_URL || "{}")

console.log("connected to planetscale")

db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL db is connected successfully!");
  }
});
