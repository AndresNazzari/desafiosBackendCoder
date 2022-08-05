const isAdministrator = (req, res, next) => {
    const {admin} = req.query

    if(!admin) return res.json({message: 'Usted no tiene privilegios'})

    next()
}

export {isAdministrator}