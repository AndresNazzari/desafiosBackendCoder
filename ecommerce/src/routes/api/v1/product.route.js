import express from 'express';
import { check } from 'express-validator';

export class ProductRoute extends express.Router {
    constructor() {
        super();
        //this.userController = new UserController();

        //@route    POST api/user
        //@desc     Register User
        //@access   Public

        this.get(
            '/', //this.userController.xxx
            (req, res) => {
                res.status(200).json({ msg: 'test' });
            }
        );
    }
}
