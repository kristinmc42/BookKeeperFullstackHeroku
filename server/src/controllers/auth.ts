import { Request, Response } from "express";
import { db, getUniqueUser, addUser, getUser } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  // check for existing username or email
  const userExists = await getUniqueUser(
    req.body.email,
    req.body.username
  ).catch((err) => {
    if (err) return res.status(500).json(err);
  });

  if (userExists && userExists.length > 0)
    return res.status(409).json("User already exists!");

  // proceed with registering user
  const salt: string = bcrypt.genSaltSync(10);
  const hash: string = bcrypt.hashSync(req.body.password, salt);

  // add the user to the db
  const newUser = await addUser(req.body.username, req.body.email, hash).catch(
    (err) => {
      if (err) return res.status(500).json(err);
    }
  );
  if (newUser) return res.status(200).json("User has been created");
};

export const login = async (req: Request, res: Response) => {
  // CHECK USER
  const user = await getUser(req.body.email).catch((err) => {
    if (err) return res.status(500).json(err);
  });

  if (user && user.length === 0) return res.status(401).json("User not authenticated! Please re-enter your email or register");

  // proceed with logging in user
  //CHECK PASSWORD
  const isPasswordCorrect: boolean = bcrypt.compareSync(
    req.body.password,
    user[0].password
  );

  if (!isPasswordCorrect) return res.status(400).json("Incorrect password!");

  const token: string = jwt.sign(
    { id: user[0].id },
    process.env.JWT_KEY as string
  );

  const { password, ...other } = user[0]; // separating out password so that we are not sending it with the other information

  // res.status(200).send("hello from login")
  res
    .cookie("access_token", token,{ maxAge: 86400000, httpOnly: true, sameSite:"lax"})
    // .cookie("access_token", token, { maxAge: 86400000, httpOnly: true, sameSite:"none", secure: true}) // only for making API requests
    .status(200)
    .setHeader('Access-Control-Allow-Origin','*')
    .json(other);
};

export const logout = (req: Request, res: Response) => {
  // clearing cookie from local storage
  res
    .clearCookie("access_token")
    .status(200)
    .json("User has been logged out.");
};
