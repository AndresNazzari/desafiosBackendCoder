function auth(req, res, next) {
    //administrador puede ser un jwt que viene en el header

    if (req.session?.userName) {
        console.log('Ruta autorizada');
        next();
    } else {
        res.status(404).redirect('/login');
    }
}
module.exports = auth;
