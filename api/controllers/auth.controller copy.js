import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({ username, email, password });
  try {
    console.log(newUser);
    await newUser.save();
    res.status(201).json(" User created successfully");
  } catch (error) {
    next(error);
  }
};

export const singin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validUserPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie(accesstoken, token, httpOnly)
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
