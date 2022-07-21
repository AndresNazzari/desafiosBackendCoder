import MongoContainer from '../../containers/mongo.container.js';
import { Cart } from '../../models/Cart.model.js';

export default class CartMongoDao extends MongoContainer {
    constructor(collection) {
        super(collection);
    }

    static getInstance() {
        if (!CartMongoDao.instance) {
            CartMongoDao.instance = new CartMongoDao('carts');
        }
        return CartMongoDao.instance;
    }
}
