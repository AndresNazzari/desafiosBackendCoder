import { validationResult } from 'express-validator';
import ROLES_LIST from '../config/rolesList.js';
import AuthService from '../services/auth.service.js';

export default class AuthController {
  constructor() {
    this.authService = AuthService.getInstance();

    this.loginUserController = this.loginUserController.bind(this);
    this.registerUserController = this.registerUserController.bind(this);
    this.authMeController = this.authMeController.bind(this);
  }

  async loginUserController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await this.authService.userExistsService(email);
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await this.authService.comparePasswordService(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const token = await this.authService.generateToken(user);

      res.status(200).json({ user: user, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async registerUserController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { adress, email, password, password2, roleId } = req.body;

    if (password !== password2) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    try {
      const userExists = await this.authService.userExistsService(email);
      if (userExists) {
        return res.status(400).json({ errors: [{ msg: 'Email already registered' }] });
      }

      const user = await this.authService.registerUserService(adress, email, password, roleId || ROLES_LIST.User);

      const token = await this.authService.generateToken(user);

      res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async authMeController(req, res) {
    const token = req.token.split(' ')[1];
    const { email } = req.tokenDecoded;

    try {
      const userDecoded = await this.authService.userExistsService(email);
      res.status(200).json({ user: userDecoded, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static getInstance() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }
}
