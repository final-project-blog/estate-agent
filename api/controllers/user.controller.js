import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js'
import errorHandler from '../utils/error.js'

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
    if (req.user._id !== req.params.id) {
        console.log("req.user.id", req.user.id)
        console.log("req.params.id", req.params.id)
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
    if (req.user._id !== req.params.id) {
        return res.status(401).json({ message: 'Not authorized!' });
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User had been deleted!' });
    } catch (error) {
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {

    if (req.user._id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You are not allowed to view this listing!'));
    }
};
