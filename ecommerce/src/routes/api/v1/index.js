import Express from 'express';
import AuthRoute from './auth.route.js';
import UserRoute from './user.route.js';
import ProductsRoute from './products.route.js';
import CartsRoute from './carts.route.js';
const router = Express.Router();

router.use('/auth', AuthRoute.getInstance());
router.use('/user', UserRoute.getInstance());
router.use('/products', ProductsRoute.getInstance());
router.use('/carts', CartsRoute.getInstance());

export default router;
