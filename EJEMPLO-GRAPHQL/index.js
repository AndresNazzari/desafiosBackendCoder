import "dotenv/config";
import express from "express";

// lo nuevo, para graph
import { graphqlHTTP } from "express-graphql";
// lo unico que nos traemos es el schema
import { schema } from "./src/graphql/index.js";

import { carritoRouter, productosRouter } from "./src/routes/index.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

// el middleware, para exponer en /graphql todo su schema
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.use("*", (req, res) => {
  const { method, baseUrl } = req;

  res.json({ error: -2, ruta: baseUrl, metodo: method });
});

app.listen(PORT, () => console.log("Running server..."));
