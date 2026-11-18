
import { Service } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from '../firebase';

export interface ProductoDatos {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export type DatosProducto = Omit<ProductoDatos, 'id'>;

@Service()
export class Producto {

  private referencia = collection(db, 'productos');

  // READ: consultar productos
  async obtenerProductos(): Promise<ProductoDatos[]> {
    const resultado = await getDocs(this.referencia);

    return resultado.docs.map(documento => {
      const datos = documento.data();

      return {
        id: documento.id,
        nombre: datos['nombre'],
        precio: datos['precio'],
        stock: datos['stock'],
        categoria: datos['categoria']
      } as ProductoDatos;
    });
  }

  // CREATE: agregar un producto
  async agregarProducto(datos: DatosProducto): Promise<void> {
    await addDoc(this.referencia, datos);
  }

  // UPDATE: modificar un producto
  async actualizarProducto(
    id: string,
    datos: DatosProducto
  ): Promise<void> {
    const referencia = doc(db, 'productos', id);
    await updateDoc(referencia, { ...datos });
  }

  // DELETE: eliminar un producto
  async eliminarProducto(id: string): Promise<void> {
    const referencia = doc(db, 'productos', id);
    await deleteDoc(referencia);
  }
}
