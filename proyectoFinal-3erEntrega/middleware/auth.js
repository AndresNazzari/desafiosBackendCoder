function auth(req, res, next) {
    if (req.session?.userName) {
        console.log('Ruta autorizada');
        next();
    } else {
        res.status(404).redirect('/login');
    }
}
module.exports = auth;
