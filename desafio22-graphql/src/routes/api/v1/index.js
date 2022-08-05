import Express from 'express';
import ProductsRoute from './products.route.js';
import UserRoute from './user.route.js';
import CartsRoute from './carts.route.js';

const router = Express.Router();

router.use('/products', ProductsRoute.getInstance());
router.use('/carts', CartsRoute.getInstance());
router.use('/user', new UserRoute());

export default router;
