import { User } from '../../models/User.model.js';
import MongoContainer from '../../containers/mongo.container.js';

export default class AuthMongoDao extends MongoContainer {
  //TODO verificar si realmente es conveniente que herede de container
  constructor() {
    super();
  }
  async getUserByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(user) {
    const newUser = new User({ ...user });
    return await newUser.save(); //The save() method returns a promise. If save() succeeds, the promise resolves to the document that was saved.
  }

  static getInstance() {
    if (!AuthMongoDao.instance) {
      AuthMongoDao.instance = new AuthMongoDao();
    }
    return AuthMongoDao.instance;
  }
}
