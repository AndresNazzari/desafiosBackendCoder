const express = require('express');
const router = express.Router();

//@routes     "/"

router.use('/', require('./home.route.js'));
router.use('/login', require('./login.route.js'));
router.use('/logout', require('./logout.route.js'));
router.use('/register', require('./register.route.js'));

module.exports = router;
