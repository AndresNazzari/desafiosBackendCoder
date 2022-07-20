import Express from 'express';
import ProductsRoute from './products.route.js';
import UserRoute from './user.route.js';
import CartsRoute from './carts.route.js';

const router = Express.Router();

router.use('/products', new ProductsRoute());
router.use('/user', new UserRoute());
router.use('/carts', new CartsRoute());

export default router;
