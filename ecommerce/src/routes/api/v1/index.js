import Express from 'express';
import AuthRoute from './auth.route.js';
import UserRoute from './user.route.js';
import ProductsRoute from './products.route.js';
import CartsRoute from './carts.route.js';
import OrdersRoute from './orders.route.js';
import ChatsRoute from './chats.route.js';

const router = Express.Router();

router.use('/auth', AuthRoute.getInstance());
router.use('/user', UserRoute.getInstance());
router.use('/products', ProductsRoute.getInstance());
router.use('/carts', CartsRoute.getInstance());
router.use('/orders', OrdersRoute.getInstance());
router.use('/chats', ChatsRoute.getInstance());

export default router;
