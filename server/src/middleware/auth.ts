import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

type UserData = {
    id: string;
    username: string;
    iat: string;
    exp: string;
};

export interface IsLoggedInRequest extends Request {
    userData: undefined | UserData;
}

function isLoggedIn(req: IsLoggedInRequest, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Please log in to continue' });
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.userData = decodedToken as UserData;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid JWT token' });
    }
}

function isLoggedOut(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.authorization.split(' ')[1];

        if (token) {
            res.status(401).json({ error: 'Please log out to continue' });
            return;
        }
        next();
    } catch (error) {
        next();
    }
}

export { isLoggedIn, isLoggedOut };
