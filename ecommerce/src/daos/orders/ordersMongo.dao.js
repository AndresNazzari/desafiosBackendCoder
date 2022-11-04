import { Order } from '../../models/Order.model.js';
import MongoContainer from '../../containers/mongo.container.js';

export default class OrdersMongoDao extends MongoContainer {
  //TODO verificar si realmente es conveniente que herede de container
  constructor(collection) {
    super(collection);
  }
  async getOrderByEmail(email) {
    return Order.findOne({ email });
  }

  async createOrder(order) {
    const newOrder = new Order({ ...order });
    return await newOrder.save(); //The save() method returns a promise. If save() succeeds, the promise resolves to the document that was saved.
  }

  static getInstance() {
    if (!OrdersMongoDao.instance) {
      OrdersMongoDao.instance = new OrdersMongoDao('carts');
    }
    return OrdersMongoDao.instance;
  }
}
