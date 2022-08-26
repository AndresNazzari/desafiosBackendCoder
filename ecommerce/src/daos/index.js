// import { firebaseDB } from '../util/firebaseDB.js';
import { mongoDB } from '../util/mongoDB.js';
import config from '../config/config.js';

import ProductsMongoDao from './products/productsMongo.dao.js';
import CartsMongoDao from './carts/cartsMongo.dao.js';
import AuthMongoDao from './auth/authMongo.dao.js';

const db = config.DAO;

let productsApi;
let cartsApi;
let authApi;

switch (db) {
  // case 'fs': // TODO Clean this code
  //     break;
  // case 'firebase': // TODO Clean this code
  //     await firebaseDB();
  //     break;
  case 'mongo':
    await mongoDB();
    productsApi = ProductsMongoDao.getInstance();
    cartsApi = CartsMongoDao.getInstance();
    authApi = AuthMongoDao.getInstance();
    break;
}

export { productsApi, cartsApi, authApi };
