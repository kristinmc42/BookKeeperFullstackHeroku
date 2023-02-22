import mysql from "mysql2";

//types
interface DbBookInfo {
  id?: number;
  title: string;
  subtitle?: string;
  author?: string;
  genre?: string;
  img?: string; // smallThumbnail url
  desc?: string;
  pageCount?: number;
  previewLink?: string;
  language?: string;
  publishedDate?: string;
  bookid: string;
  dateRead?: string;
  status?: string; // read/toRead/currentlyReading
  userid: number | undefined | null;
}

export const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: true,
    },
  })
  .promise();

export const getUniqueUser = async (email: string, username: string) => {
  const q: string = "SELECT * FROM users WHERE email = ? OR username = ?";
  const [data] = await db.query(q, [email, username]);
  return data;
};

export const addUser = async (
  username: string,
  email: string,
  hash: string
) => {
  const q: string =
    "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
  const values: string[] = [username, email, hash];

  const [data] = await db.query(q, [values]);
  return data;
};

export const getUser = async (email: string) => {
  const q: string = "SELECT * FROM users WHERE email = ?";

  const [data] = await db.query(q, [email]);
  return data;
};

export const getUserByName = async (username: string) => {
  const q: string = "SELECT `id` FROM users WHERE username = ?";

  const [data] = await db.query(q, [username]);
  return data;
};

export const getAllUsersBooks = async (userId: number) => {
  const q = "SELECT * FROM books WHERE userid = ?";

  const [data] = await db.query(q, [userId]);
  return data;
};

export const getSingleBook = async (bookId: string, userId: number) => {
  const q =
    "SELECT `title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid` FROM books WHERE bookid = ? AND userid = ?";

  const [data] = await db.query(q, [bookId, userId]);
  return data;
};

export const addBookToDB = async (book: DbBookInfo, userId: number) => {
  const q =
    "INSERT INTO books(`title`, `subtitle`, `author`, `genre`,  `img`, `desc`,`pageCount`, `previewLink`, `language`, `publishedDate`, `bookid`, `dateRead`,`status`, `userid`) VALUES (?)";

  const values = [
    book.title,
    book.subtitle,
    book.author,
    book.genre,
    book.img,
    book.desc,
    book.pageCount,
    book.previewLink,
    book.language,
    book.publishedDate,
    book.bookid,
    book.dateRead,
    book.status,
    userId,
  ];

  const [data] = await db.query(q, [values]);
  return data;
};

export const deleteDbBook = async (bookId: string, userId: number) => {
  const q = "DELETE FROM books WHERE `bookid` = ? AND `userid` = ?";

  const [data] = await db.query(q, [bookId, userId]);
  return data;
};

export const updateDbBook = async (
  bookId: string,
  userId: number,
  status: string,
  dateRead: string
) => {
  const q =
    "UPDATE books SET `status`=?, `dateRead`=? WHERE `bookid`=? AND `userid`=?";

  const values = [status, dateRead];

  const [data] = await db.query(q, [...values, bookId, userId]);
  return data;
};

