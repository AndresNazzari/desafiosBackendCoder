import express from 'express';
import { check } from 'express-validator';

export default class UserRoute extends express.Router {
    constructor() {
        super();

        this.get('/', (req, res) => {
            res.status(200).json({ msg: 'test' });
        });
    }
}
