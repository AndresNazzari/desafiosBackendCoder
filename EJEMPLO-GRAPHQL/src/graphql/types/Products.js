import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

// Definimos el tipo de dato para Producto (esto es independiente a mongoose por ejemplo, esto es exclusivo para la interfaz con graphql)

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Product type",
  fields: () => ({
    _id: { type: GraphQLID },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    price: { type: GraphQLInt },
    thumbnail: { type: GraphQLString },
    codigo: { type: GraphQLString },
  }),
});

export { ProductType };
