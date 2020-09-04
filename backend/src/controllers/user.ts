import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../models/User';

class UserController {
    public handleLogin(req: Request, res: Response) {
        if (req.method == 'POST') this.handleLoginPost(req, res);
    }

    public handleRegister(req: Request, res: Response) {
        if (req.method == 'POST') this.handleRegisterPost(req, res);
    }

    public handleLogout(req: Request, res: Response) {
        this.handleLogoutGet(req, res);
    }

    private async handleLoginPost(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username }).exec();
            if (!user) {
                res.status(401).send('Incorrect email/password combination');
                return;
            }

            try {
                const isCorrectPassword = await user.isCorrectPassword(
                    password
                );
                if (!isCorrectPassword) {
                    res.status(401).send(
                        'Incorrect email/password combination'
                    );
                    return;
                }

                const token = jwt.sign({ username }, process.env.SECRET, {
                    expiresIn: '3600s',
                });

                res.cookie('token', token, {
                    httpOnly: true,
                }).send('Logged in successfully');
                return;
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal server error');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    private async handleRegisterPost(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = new User({ username, password });

        try {
            await user.save();
            const token = jwt.sign({ username }, process.env.SECRET, {
                expiresIn: '3600s',
            });

            res.cookie('token', token, {
                httpOnly: true,
            }).send('User created and logged in successfully');
        } catch (error) {
            res.status(500).send('Error registering new user');
        }
    }

    private handleLogoutGet(req: Request, res: Response) {
        res.clearCookie('token').send('Logged out successfully');
    }
}

export default new UserController();
