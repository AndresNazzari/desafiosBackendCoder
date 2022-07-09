const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(404).redirect('/login');
    }
};

module.exports = isAuth;
