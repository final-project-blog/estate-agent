import jwt from 'jsonwebtoken';
import { errorHandler } from ' ./error.js';


export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided.'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
};