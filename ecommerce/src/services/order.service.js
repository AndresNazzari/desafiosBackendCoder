import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { orderApi } from '../daos/index.js';

export default class OrderService {
  async orderExistsService(order) {}

  static getInstance() {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }
}
