import { CarritoArchivo } from './carrito/CarritoArchivo.js';
// import { CarritoMongo } from "./carrito/CarritoMongo.js";
import { ProductoArchivo } from './productos/ProductoArchivo.js';
// import { ProductoMongo } from "./productos/ProductoMongo.js";

const getSelectedDatabase = (selected) => {
    switch (selected) {
        case 'mongo': {
            // const carritoApi = new CarritoMongo();
            // const productosApi = new ProductoMongo();
            // return { carritoApi, productosApi };
        }
        default: {
            const carritoApi = new CarritoArchivo();
            const productosApi = new ProductoArchivo();
            return { carritoApi, productosApi };
        }
    }
};

const SELECTED_DB = 'archivo';

const { carritoApi, productosApi } = getSelectedDatabase(SELECTED_DB);

export { carritoApi, productosApi };
