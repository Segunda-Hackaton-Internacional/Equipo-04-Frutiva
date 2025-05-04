import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProductoCarrito {
  nombre: string;
  marca: string;
  precioUnitario: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  productos: ProductoCarrito[] = [
    { nombre: 'Mermelada de Fresa', marca: 'DelCampo', precioUnitario: 4.5, cantidad: 2 },
    { nombre: 'Mermelada de Mora', marca: 'NaturalFruit', precioUnitario: 5.2, cantidad: 1 },
    { nombre: 'Mermelada de Mango', marca: 'Frutalia', precioUnitario: 4.8, cantidad: 3 },
    { nombre: 'Mermelada de Guayaba', marca: 'TierraDulce', precioUnitario: 4.0, cantidad: 1 }
  ];

  aumentarCantidad(index: number) {
    this.productos[index].cantidad++;
  }

  disminuirCantidad(index: number) {
    this.productos[index].cantidad--;
    if (this.productos[index].cantidad === 0) {
      this.productos.splice(index, 1);
    }
  }

  obtenerTotal(): number {
    return this.productos.reduce((total, prod) => total + prod.precioUnitario * prod.cantidad, 0);
  }
}
