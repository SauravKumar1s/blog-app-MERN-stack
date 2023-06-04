import express from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  await User.find()
    .then((result) => {
      res.status(200).json({ user: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(name, email, password);
      const user = await User.create({ name, email, password: hashPassword });
      res
        .status(200)
        .json({ msg: "user registered successfully ", user: user });
    } else {
      res.status(400).json({ msg: "please fill the all your requirements " });
    }
  } catch (error) {
    res.status(400).json({ msg: error  });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      res.status(404).json({ error: "user not found " });
    }
    const matchPassword = await bcrypt.compare(password, existUser.password)

    if (!matchPassword) {
      res.status(400).json({ msg: "wrong password you have " });
    } 
    const token = jwt.sign({ id: existUser._id }, process.env.SECRETKey);

    res
      .status(201)
      .json({ msg: "logged in successfully saurav bhai  ", token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
export default UserRouter;
