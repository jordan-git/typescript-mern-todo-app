import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function isAuthorized(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.SECRET, (err: Error, decoded) => {
            if (err) res.status(401).send('Unauthorized: Invalid token');
            else {
                // req.username = decoded.username;
                next();
            }
        });
    }
}

export default isAuthorized;
