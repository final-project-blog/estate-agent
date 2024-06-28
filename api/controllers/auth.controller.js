import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const signup = async (req, res, next) => {
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

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found"));
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
      const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json("User has been logged out.");
    } catch (error) {
      next(error);
    }
  };


  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
    let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        const generatedPassword = Math.random().toString(36).split(-8)+Math.random().toString(36).split(-8);
        user = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          password: generatedPassword,
          profilePicture: profile.photos[0].value
        });
        console.log("if",user);
        await user.save();
        }
        console.log("else", user);
        // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // const { password: pass, ...restuser } = req.user._doc;
        // let cookie = cookie('access_token', token, { httpOnly: true });
        // userData = json(restuser);
        return cb(null, user);
        } catch (error) {
        return cb(error);
      }
    }));
  passport.serializeUser(function(user, done) {
    console.log("serializeUser", user);
    done(null, user._id); 
  });

  passport.deserializeUser(async function(_id, done) {
    await User.findById(_id, function(err, user) {
      done(err, user); 
    });
  });
  const google = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  };

  const googleCallback = (req, res, next) => {
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" })(req, res, () => {
      console.log("req.user",req.user);
      res.redirect('http://localhost:5173/');
    });
  };


export { signup, signin, signOut, google, googleCallback };

