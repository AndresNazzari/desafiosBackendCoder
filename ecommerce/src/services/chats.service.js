import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { chatApi } from '../daos/index.js';

export default class ChatsService {
  async chatExistsService(order) {}

  static getInstance() {
    if (!ChatsService.instance) {
      ChatsService.instance = new ChatsService();
    }
    return ChatsService.instance;
  }
}
