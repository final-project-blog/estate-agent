import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { errorHandler } from '../units/error.js';

export const test = (req, res) => {
    res.json({
        message: 'Welcome to the API!',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({ message: 'Not authorized!' });
    }

    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
      
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({ message: 'Not authorized!' });
    }
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        next(error);
    }
};
