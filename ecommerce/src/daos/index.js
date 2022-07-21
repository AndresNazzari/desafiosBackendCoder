import { firebaseDB } from '../util/firebaseDB.js';
import { mongoDB } from '../util/mongoDB.js';
import config from '../config/config.js';

import ProductsMongoDao from './products/productsMongo.dao.js';
import CartsMongoDao from './carts/cartsMongo.dao.js';

const db = config.DAO;

let productsApi;
let cartsApi;

switch (db) {
    case 'fs':
        break;
    case 'firebase':
        await firebaseDB();
        break;
    case 'mongo':
        await mongoDB();
        productsApi = ProductsMongoDao.getInstance();
        cartsApi = CartsMongoDao.getInstance();
        break;
}

export { productsApi, cartsApi };
