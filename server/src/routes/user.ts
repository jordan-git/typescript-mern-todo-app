import { Router } from 'express';

import UserController from '../controllers/user';
import { isLoggedIn, isLoggedOut, IsLoggedInRequest } from '../middleware/auth';

const router = Router();

router.post('/login', async (req, res) => UserController.handleLogin(req, res));

router.post('/register', isLoggedOut, async (req, res) =>
    UserController.handleRegister(req, res)
);

router.get('/validate', isLoggedIn, (req: IsLoggedInRequest, res) =>
    res.send(req.userData).end()
);

export { router };
