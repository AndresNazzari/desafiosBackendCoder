import {Router} from 'express'
import { isAdministrator } from '../middlewares/index.js'
import {productosApi} from '../daos/index.js'

const productosRouter = Router()

productosRouter.get('/:id?', async (req, res) => {
    try {
        const {id} = req.params
        if(id){
            const producto = await productosApi.mostrarPorId(id)
            return producto ? res.json(producto) : res.json({message: 'Producto no encontrado'})
        }
        const productos = await productosApi.mostrarTodos()
        res.json(productos) 
    } catch (error) {
        res.json(error)
    }

})

productosRouter.post('/',[isAdministrator], async (req, res) => {
    const { title, price, thumbnail, codigo } = req.body
    if(!title || !price || !thumbnail) return res.send('Debe completar todos los campos')
    const respuesta = await productosApi.guardarElemento({title, price, thumbnail, codigo})

    res.json(respuesta)
})

productosRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, price, thumbnail} = req.body

    const respuesta = await productosApi.actualizar(id, {title, price, thumbnail})

    res.json(respuesta)
})

productosRouter.delete('/:id?', async (req,res) => {
    const {id} = req.params
    if(id){
        const respuesta = await productosApi.eliminarPorId(id)
        res.json(respuesta)
        return
    }
})



export {productosRouter}