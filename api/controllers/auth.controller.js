import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
        const hashedPassword = bcrypt.hashSync(password,salt);
        const newUser = new User({ username, email, password });
    try {
        console.log(newUser);
        await newUser.save();
        res.status(201).json(" User created successfully");
    } catch (error) {
        next(error);
    }
    
};

export default { signup };