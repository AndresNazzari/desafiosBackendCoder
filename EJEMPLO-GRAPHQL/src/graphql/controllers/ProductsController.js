import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { ProductType } from '../types/Products.js';
import { productosApi } from '../../daos/index.js';

// Primer query, para traer todos los productos
// como mostraba hoy el profe, tenemos que definir el tipado que nos devolverá
// Pero tambien podemos generarlo con una api de ellos que se llama GraphQLObjectType
// Ese tipado viene en ProductType (vayan a la carpeta /graphql/types)
// ademas hay que decir que va a ser un array (lista), tenemos que usar un GraphqlList y pasarle el tipo de elemento que tendra el array
// podemos darle descripcion
// en el resolve, tenemos que hacer el método / controller / resolver que va a interactuar con la db (con lo que sea, directo, dao, service)
const getProducts = {
    type: new GraphQLList(ProductType),
    description: 'return a string',
    resolve: async () => {
        // si van a la carpeta routes / productosRouter, van a ver que esto es lo que hace basicamente la ruta de express para la api rest, pero lo hacemos tambien aca asi podemos usar graphql
        const productos = await productosApi.mostrarTodos();
        return productos;
    },
};

// esto va a ser una mutation
// tenemos que decir que tipo de dato devolvera, en este caso un objeto ProductType
// definir los argumentos que vamos a recibir (como si fuera el body en api rest)
// y el resolve va a hacer todo como en la query
// en el caso de argumentos, nos llegaran en el segundo parametro y podemos hacer un destructuring
// finalmente hacemos lo mismo que en productosRouter, llamamos al dao en este caso, y retornamos respuesta
const saveProduct = {
    type: ProductType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        thumbnail: { type: new GraphQLNonNull(GraphQLString) },
        codigo: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { title, price, thumbnail, codigo }) => {
        const respuesta = await productosApi.guardarElemento({
            title,
            price,
            thumbnail,
            codigo,
        });
        return respuesta;
    },
};

const ProductController = {
    mutations: {
        saveProduct,
    },
    queries: {
        getProducts,
    },
};

export { ProductController };
