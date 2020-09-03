import { Router } from 'express';

import UserController from '../controllers/user';
import { isLoggedIn, isLoggedOut } from '../middleware/auth';

const router = Router();

router.post('/login', isLoggedOut, async (req, res) =>
    UserController.handleLogin(req, res)
);

router.post('/register', isLoggedOut, async (req, res) =>
    UserController.handleRegister(req, res)
);

router.get('/logout', isLoggedIn, (req, res) =>
    UserController.handleLogout(req, res)
);

router.get('verify-token', isLoggedIn, (req, res) => res.sendStatus(200));

export { router };
