import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ProductController } from "./controllers/index.js";

// Declaración de schemas y resolvers ( los resolver son como los controllers pero para graphql)

// Todo esto se puede ver en la docu / internet
// Basicamente son los dos putnos de entrada, uno para Queries y otro para Mutations
// en fields, van a ir todos los métodos
// en vez de trarelos por separado, yo los arme como en "modulos"
// ProductController es un objeto que trae las queries y las mutations para producto

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    ...ProductController.queries,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    ...ProductController.mutations,
  },
});

// Creamos un nuevo Schema, donde almacenamos finalmente los dos puntos de entrada para query y mutation

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export { schema };
