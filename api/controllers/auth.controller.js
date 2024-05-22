import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
        const hashedPassword = bcrypt.hash(password,10);
        const newUser = new User({ username, email, hashedPassword });
    try {
        console.log(newUser);
        await newUser.save();
        res.status(201).json(" User created successfully");
    } catch (error) {
        next(error);
    }
    
};

export default { signup };