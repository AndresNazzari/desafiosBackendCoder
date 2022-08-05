import { MongoClient, ObjectId } from "mongodb";
import { mongo } from "../config/index.js";

// const client = new MongoClient(mongo.uri);
// await client.connect();
// const database = client.db("coder-demo");

class ContenedorMongo {
  constructor(nombreColeccion) {
    this.coleccion = database.collection(nombreColeccion);
  }

  async mostrarTodos() {
    try {
      const resultado = await this.coleccion.find().toArray();

      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async guardarElemento(nuevoElemento) {
    try {
      const respuesta = await this.coleccion.insertOne(nuevoElemento);
      const elemento = await this.mostrarPorId(respuesta.insertedId.id);
      return elemento;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mostrarPorId(id) {
    try {
      const resultado = await this.coleccion.findOne({ _id: ObjectId(id) });
      return resultado;
    } catch (error) {
      return error;
    }
  }

  async actualizar(id, nuevaData) {
    try {
      const elementoActualizado = this.coleccion.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: nuevaData }
      );
      return elementoActualizado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async eliminarPorId(id) {
    try {
      const elementoeliminado = await this.coleccion.deleteOne({
        _id: ObjectId(id),
      });
      return elementoeliminado;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { ContenedorMongo };
