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

    private handleLoginPost(req: Request, res: Response) {
        const { username, password } = req.body;
        User.findOne({ username }, (err: Error, user) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
            } else if (!user) {
                res.status(401).send('Incorrect email/password combination');
            } else {
                user.isCorrectPassword(
                    password,
                    (err: Error, isSame: boolean) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Internal server error');
                        } else if (!isSame) {
                            res.status(401).send(
                                'Incorrect email/password combination'
                            );
                        } else {
                            const payload = { username };
                            const token = jwt.sign(
                                payload,
                                process.env.SECRET,
                                { expiresIn: '1h' }
                            );
                            res.cookie('token', token, {
                                httpOnly: true,
                            }).sendStatus(200);
                        }
                    }
                );
            }
        });
    }

    private handleRegisterPost(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = new User({ username, password });
        user.save((err: Error) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error registering new user');
            } else res.redirect('/');
        });
    }
}

export default new UserController();
