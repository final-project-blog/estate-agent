import User from "../models/user.model.js";
import errorHandler from "../utills/error.js";
import jwt from "jsonwebtoken";
import passport from "passport";
// import GoogleStrategy from 'passport-google-oauth20';
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
        .cookie(accesstoken, token, httpOnly)
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };



  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      const generatedPassword = math.random().toString().slice(-8);
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          password: generatedPassword,
          profilePicture: profile.photos[0].value
        });
        await user.save();
      }
      
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }));


  const google = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  };
  
  const googleCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect('/login');
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('accesstoken', token, { httpOnly: true });
      res.redirect('/');
    })(req, res, next);
  };


export { signup, signin, google, googleCallback };

