import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

// Definimos el tipo de dato para Producto (esto es independiente a mongoose por ejemplo, esto es exclusivo para la interfaz con graphql)

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'Product type',
    fields: () => ({
        _id: { type: GraphQLID },
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        discountPercentage: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        qty: { type: GraphQLString },
    }),
});

export { ProductType };
