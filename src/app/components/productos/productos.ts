
import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Producto,
  ProductoDatos,
  DatosProducto
} from '../../services/producto';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import { auth } from '../../firebase';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit, OnDestroy {

  private productoService = inject(Producto);
  private cancelarObservador?: () => void;

  productos = signal<ProductoDatos[]>([]);
  usuario = signal<User | null>(null);

  cargando = signal(false);
  guardando = signal(false);

  error = signal('');
  mensaje = signal('');
  editandoId = signal<string | null>(null);

  formulario: DatosProducto = this.formularioVacio();

  private formularioVacio(): DatosProducto {
    return {
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: ''
    };
  }

  ngOnInit(): void {
    this.cancelarObservador = onAuthStateChanged(
      auth,
      usuario => this.usuario.set(usuario)
    );

    this.cargarProductos();
  }

  ngOnDestroy(): void {
    this.cancelarObservador?.();
  }

  // AUTENTICACIÓN CON GOOGLE
  async iniciarSesion(): Promise<void> {
    this.error.set('');

    try {
      const proveedor = new GoogleAuthProvider();
      await signInWithPopup(auth, proveedor);
    } catch (error) {
      console.error(error);
      this.error.set('No se pudo iniciar sesión.');
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await signOut(auth);
      this.cancelarEdicion();
    } catch (error) {
      console.error(error);
      this.error.set('No se pudo cerrar sesión.');
    }
  }

  // READ
  async cargarProductos(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    try {
      const lista = await this.productoService.obtenerProductos();
      this.productos.set(lista);
    } catch (error) {
      console.error(error);
      this.error.set('No se pudieron cargar los productos.');
    } finally {
      this.cargando.set(false);
    }
  }

  // CREATE Y UPDATE
  async guardarProducto(): Promise<void> {
    if (!this.usuario() || this.guardando()) {
      return;
    }

    const datos: DatosProducto = {
      nombre: this.formulario.nombre.trim(),
      precio: Number(this.formulario.precio),
      stock: Number(this.formulario.stock),
      categoria: this.formulario.categoria.trim()
    };

    if (
      !datos.nombre ||
      !datos.categoria ||
      !Number.isFinite(datos.precio) ||
      datos.precio < 0 ||
      !Number.isInteger(datos.stock) ||
      datos.stock < 0
    ) {
      this.error.set('Revisa los datos del formulario.');
      return;
    }

    this.guardando.set(true);
    this.error.set('');
    this.mensaje.set('');

    try {
      const id = this.editandoId();

      if (id !== null) {
        await this.productoService.actualizarProducto(id, datos);
        this.mensaje.set('Producto actualizado correctamente.');
      } else {
        await this.productoService.agregarProducto(datos);
        this.mensaje.set('Producto agregado correctamente.');
      }

      this.cancelarEdicion();
      await this.cargarProductos();

    } catch (error) {
      console.error(error);
      this.error.set('No se pudo guardar. Revisa los permisos.');
    } finally {
      this.guardando.set(false);
    }
  }

  // CARGAR DATOS EN EL FORMULARIO
  editarProducto(producto: ProductoDatos): void {
    this.editandoId.set(producto.id);

    this.formulario = {
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria
    };

    this.error.set('');
    this.mensaje.set('');
  }

  cancelarEdicion(): void {
    this.editandoId.set(null);
    this.formulario = this.formularioVacio();
  }

  // DELETE
  async eliminarProducto(producto: ProductoDatos): Promise<void> {
    if (!this.usuario() || this.guardando()) {
      return;
    }

    const confirmado = window.confirm(
      `¿Deseas eliminar ${producto.nombre}?`
    );

    if (!confirmado) {
      return;
    }

    this.guardando.set(true);
    this.error.set('');
    this.mensaje.set('');

    try {
      await this.productoService.eliminarProducto(producto.id);

      if (this.editandoId() === producto.id) {
        this.cancelarEdicion();
      }

      this.mensaje.set('Producto eliminado correctamente.');
      await this.cargarProductos();

    } catch (error) {
      console.error(error);
      this.error.set('No se pudo eliminar. Revisa los permisos.');
    } finally {
      this.guardando.set(false);
    }
  }
}
