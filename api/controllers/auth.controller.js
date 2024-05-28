import User from "../models/user.model.js";
import * as GoogleStrategy from 'passport-google-oauth20';

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

