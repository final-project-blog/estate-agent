import User from "../models/user.model.js";
import * as GoogleStrategy from 'passport-google-oauth20';
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
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
      const validPassword = bcrypt.compareSync(password, validUser.password);
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

export const google = async (req, res, next) => {
    passport.use(new GoogleStrategy({
        clientID: "3<YOUR_GoogleOAuthClientID_HERE>",
        clientSecret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        callbackURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            cb(null, profile);
        }
    ));
    }
}

export default { signup };

