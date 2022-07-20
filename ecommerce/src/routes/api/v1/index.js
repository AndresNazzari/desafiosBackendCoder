import Express from 'express';
import { ProductRoute } from './product.route.js';
import { UserRoute } from './user.route.js';
import { CartRoute } from './cart.route.js';

const router = Express.Router();

router.use('/products', new ProductRoute());
router.use('/user', new UserRoute());
router.use('/user', new CartRoute());

export default router;
