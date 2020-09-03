import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Please log in to continue');
        return;
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid JWT token');
    }
}

function isLoggedOut(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (token) {
        res.status(401).send('Please log out to continue');
        return;
    }

    next();
}

export { isLoggedIn, isLoggedOut };
