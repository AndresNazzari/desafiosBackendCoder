import { Chat } from '../../models/Chat.model.js';
import MongoContainer from '../../containers/mongo.container.js';

export default class ChatsMongoDao extends MongoContainer {
  //TODO verificar si realmente es conveniente que herede de container
  constructor(collection) {
    super(collection);
  }
  async getChatByEmail(email) {
    return Chat.findOne({ email });
  }

  async createChat(order) {
    const newChat = new Chat({ ...order });
    return await newChat.save(); //The save() method returns a promise. If save() succeeds, the promise resolves to the document that was saved.
  }

  static getInstance() {
    if (!ChatsMongoDao.instance) {
      ChatsMongoDao.instance = new ChatsMongoDao('carts');
    }
    return ChatsMongoDao.instance;
  }
}
