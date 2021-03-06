import config from 'config';
import path from 'path';
import { mongoDB } from '../config/mongoDb.js';
import { firebaseDB } from '../config/firebaseDb.js';
import { CarritosDaoFs } from './carritos/CarritosDaoFs.js';
import { ProductosDaoFs } from './productos/ProductosDaoFs.js';
import { CarritosDaoFirebase } from './carritos/CarritosDaoFirebase.js';
import { ProductosDaoFirebase } from './productos/ProductosDaoFirebase.js';
import { CarritosDaoMongo } from './carritos/CarritosDaoMongo.js';
import { ProductosDaoMongo } from './productos/ProductosDaoMongo.js';

//esto viene del archivo default.json de la carpeta config, indica que tipo de persistencia se va a usar
const db = config.get('useDB');

//REALIZAR SWITCH e instanciar DAO segun  la persistencia
let productosApi;
let carritosApi;

switch (db) {
    case 'fs':
        const productosFile = path.join(process.cwd(), '/proyectoFinal/db/productos.txt');
        const carritosFile = path.join(process.cwd(), '/proyectoFinal/db/carritos.txt');
        productosApi = new ProductosDaoFs(productosFile);
        carritosApi = new CarritosDaoFs(carritosFile);
        break;
    case 'mongo':
        await mongoDB();
        productosApi = new ProductosDaoMongo('productos');
        carritosApi = new CarritosDaoMongo('carritos');
        break;
    case 'firebase':
        await firebaseDB();
        productosApi = new ProductosDaoFirebase('productos');
        carritosApi = new CarritosDaoFirebase('carritos');
        break;
}

export { productosApi, carritosApi };
