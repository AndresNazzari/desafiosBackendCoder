export default function auth(req, res, next) {
    const administrador = true;
    //administrador puede ser un jwt que viene en el header
    if (administrador) {
        console.log('Ruta autorizada');
        next();
    } else {
        res.status(404).json({
            error: -1,
            descripcion: `ruta ${req.path} y método ${req.method} no autorizada`,
        });
    }
}
