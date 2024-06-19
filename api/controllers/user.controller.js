import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; // Import User model once
import  errorHandler  from '../utils/error.js';

export const test = (req, res) => {
    try {
        
        throw errorHandler(500, 'Internal Server Error');
    } catch (error) {
        console.error('Caught error:', error);
        res.status(error.statusCode || 500).json({
            message: error.message || 'An unknown error occurred',
        });
    }
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
        req.clearCookie('access_token');
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        next(error);
    }
};

