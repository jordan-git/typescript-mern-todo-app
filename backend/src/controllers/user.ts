import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../models/User';

class UserController {
    public async handleLogin(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username }).exec();

            if (!user) {
                res.status(401).json({
                    error: 'Incorrect email/password combination',
                });
                return;
            }

            try {
                const isCorrectPassword = await user.isCorrectPassword(
                    password
                );

                if (!isCorrectPassword) {
                    res.status(401).json({
                        error: 'Incorrect email/password combination',
                    });
                    return;
                }

                const token = jwt.sign({ username }, process.env.SECRET, {
                    expiresIn: '3600s',
                });

                res.cookie('token', token, {
                    httpOnly: true,
                }).json({ token });
            } catch (error) {
                res.status(500).json({ error });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async handleRegister(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = new User({ username, password });

        try {
            await user.save();

            const token = jwt.sign({ username }, process.env.SECRET, {
                expiresIn: '3600s',
            });

            res.cookie('token', token, {
                httpOnly: true,
            }).json({ token });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export default new UserController();
