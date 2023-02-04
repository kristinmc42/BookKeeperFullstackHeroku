import mysql from "mysql"

export const db = mysql.createConnection(process.env.DATABASE_URL || "{}")

console.log("connected to planetscale")

db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL db is connected successfully!");
  }
});
