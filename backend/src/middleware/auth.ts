import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: 'Please log in to continue' });
        return;
    }

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid JWT token' });
    }
}

function isLoggedOut(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token;

    if (token) {
        res.status(401).json({ error: 'Please log out to continue' });
        return;
    }

    next();
}

export { isLoggedIn, isLoggedOut };
