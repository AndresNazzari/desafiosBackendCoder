import * as fs from "fs/promises";
import { archivo } from "../config/index.js";

class ContenedorArchivo {
  constructor(nombreArchivo) {
    this.nombreArchivo = `${archivo.directorio}/${nombreArchivo}.txt`;
  }

  async mostrarTodos() {
    try {
      const archivo = await fs.readFile(this.nombreArchivo);
      const elementos = JSON.parse(archivo);
      return elementos;
    } catch (error) {
      throw new Error(error);
    }
  }

  async guardarElemento(nuevoElemento) {
    try {
      const elementos = await this.mostrarTodos();

      const ultimoElemento = elementos[elementos.length - 1];

      nuevoElemento.id = ultimoElemento ? ultimoElemento.id + 1 : 1;

      elementos.push(nuevoElemento);

      await fs.writeFile(
        this.nombreArchivo,
        JSON.stringify(elementos, null, 3)
      );

      return nuevoElemento;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mostrarPorId(id) {
    try {
      const elementos = await this.mostrarTodos();
      const resultado = elementos.find(
        (elemento) => elemento.id === parseInt(id)
      );

      return resultado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async actualizar(id, nuevaData) {
    try {
      const elementos = await this.mostrarTodos();
      const elementoIndex = elementos.findIndex(
        (elemento) => elemento.id === parseInt(id)
      );

      if (elementoIndex === -1) return { message: "elemento no encontrado" };
      const elementoActualizado = { ...elementos[elementoIndex], ...nuevaData };
      elementos[elementoIndex] = elementoActualizado;

      await fs.writeFile(
        this.nombreArchivo,
        JSON.stringify(elementos, null, 3)
      );
      return elementoActualizado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async eliminarPorId(id) {
    try {
      const elementos = await this.mostrarTodos();
      const elementoIndex = elementos.findIndex(
        (elemento) => elemento.id === parseInt(id)
      );

      if (elementoIndex === -1) return { message: "elemento no encontrado" };

      const elementoEncontrado = elementos[elementoIndex];

      elementos.splice(elementoIndex, 1);
      await fs.writeFile(
        this.nombreArchivo,
        JSON.stringify(elementos, null, 3)
      );

      return elementoEncontrado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async eliminarTodos() {
    try {
      await fs.writeFile(this.nombreArchivo, JSON.stringify([]));
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { ContenedorArchivo };
