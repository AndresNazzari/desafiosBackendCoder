import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { authApi, mailApi } from '../daos/index.js';

export default class AuthService {
  async userExistsService(email) {
    const user = await authApi.getUserByEmail(email);
    if (!user) {
      return false;
    }
    return user._doc;
  }

  async registerUserService(adress, email, password, roleId) {
    const passwordHash = await this.encryptPassword(password);
    const userData = { adress, email, password: passwordHash, roleId };

    const newUser = await authApi.createUser(userData);
    await mailApi.sendEmail(newUser, true);

    return { ...userData, id: newUser.id };
  }

  async generateToken(UserInfo) {
    return jwt.sign({ ...UserInfo }, config.ACCESS_TOKEN_KEY, { expiresIn: 60 /*seconds*/ * 60 * 24 });
  }

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswordService(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}
