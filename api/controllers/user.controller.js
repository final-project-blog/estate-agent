import bcryptis from 'bcryptis';
import User from '../models/user.model.js';
import { errorHandler } from '../units/error.js';

export const test = (req, res) => {
    res.json({
        message: 'Welcome to the API!',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.parmas.id) 
        return res.status(401).json({ message: 'Not authorized!' });

    try {
      if (req.body.password) {
        req.body.password = await bcryptis.hash(req.body.password, 10);
      }  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });


      const { password, ...rest } = updatedUser._doc;

      res.status(200).json(rest);
      
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.parmas.id) 
        return res.status(401).json({ message: 'Not authorized!' });
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        next(error);
    }
}; 
