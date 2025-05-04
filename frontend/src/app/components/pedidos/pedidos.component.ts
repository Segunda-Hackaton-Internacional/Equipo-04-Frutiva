import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProductoPedido {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

interface Pedido {
  id: number;
  productos: ProductoPedido[];
  estado: string;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos: Pedido[] = [
    {
      id: 1,
      estado: 'En almacén',
      productos: [
        { nombre: 'Mermelada de Fresa', cantidad: 2, precioUnitario: 4.5 },
        { nombre: 'Mermelada de Mango', cantidad: 1, precioUnitario: 4.8 }
      ]
    },
    {
      id: 2,
      estado: 'Listo para recoger',
      productos: [
        { nombre: 'Mermelada de Guayaba', cantidad: 3, precioUnitario: 4.0 }
      ]
    },
    {
      id: 3,
      estado: 'Entregado',
      productos: [
        { nombre: 'Mermelada de Mora', cantidad: 2, precioUnitario: 5.2 },
        { nombre: 'Mermelada de Fresa', cantidad: 1, precioUnitario: 4.5 }
      ]
    }
  ];

  cancelarPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
  }

  obtenerTotalPedido(pedido: Pedido): number {
    return pedido.productos.reduce((total, p) => total + p.cantidad * p.precioUnitario, 0);
  }
}
