// import { firebaseDB } from '../util/firebaseDB.js';
import { mongoDB } from '../util/mongoDB.js';
import config from '../config/config.js';

import ProductsMongoDao from './products/productsMongo.dao.js';
import CartsMongoDao from './carts/cartsMongo.dao.js';
import AuthMongoDao from './auth/authMongo.dao.js';
import OrderMongoDao from './orders/ordersMongo.dao.js';
import ChatsMongoDao from './chats/chatsMongo.dao.js';
import InfoApi from '../containers/info.container.js';
import MailApi from '../containers/mail.container.js';
const db = config.DAO;

let productsApi;
let cartsApi;
let authApi;
let orderApi;
let chatApi;
let infoApi;
let mailApi;
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
    orderApi = OrderMongoDao.getInstance();
    chatApi = ChatsMongoDao.getInstance();
    infoApi = InfoApi.getInstance();
    mailApi = MailApi.getInstance();
    break;
}

export { productsApi, cartsApi, authApi, orderApi, chatApi, infoApi, mailApi };
