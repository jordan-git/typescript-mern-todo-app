import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../models/User';

class UserController {
    public async handleLogin(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username }).exec();

            if (!user) {
                return res.status(401).json({
                    error: 'Incorrect email/password combination',
                });
            }

            try {
                const isCorrectPassword = await user.isCorrectPassword(
                    password
                );

                if (!isCorrectPassword) {
                    return res.status(401).json({
                        error: 'Incorrect email/password combination',
                    });
                }

                const token = jwt.sign(
                    { id: user._id, username },
                    process.env.SECRET,
                    {
                        expiresIn: '3600s',
                    }
                );

                return res
                    .cookie('token', token, {
                        httpOnly: true,
                    })
                    .json({ token });
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
            const userExists = await User.findOne({ username }).exec();
            if (userExists) {
                return res
                    .status(409)
                    .json({ error: 'Username already exists' });
            }
        } catch (error) {
            res.status(500).json({ error });
        }

        try {
            await user.save();

            const token = jwt.sign(
                { id: user._id, username },
                process.env.SECRET,
                {
                    expiresIn: '3600s',
                }
            );

            res.cookie('token', token, {
                httpOnly: true,
            }).json({ token });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export default new UserController();
