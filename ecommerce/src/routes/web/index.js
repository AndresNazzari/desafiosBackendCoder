import Express from 'express';
import InfoRoute from './info.route.js';
// import LoginRoute from './login.route.js';
// import RegisterRoute from './register.route.js';

const router = Express.Router();

router.use('/info', InfoRoute.getInstance());
// router.use('/login', LoginRoute);
// router.use('/register', RegisterRoute);

export default router;
