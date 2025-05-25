import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProductoPedido {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  imagen?: string;
}

interface Pedido {
  id: number;
  productos: ProductoPedido[];
  estado: string;
  fechaPedido: Date;
  fechaEntrega?: Date;
  cliente: string;
  direccion: string;
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
      id: 1001,
      estado: 'En preparación',
      fechaPedido: new Date('2024-01-15'),
      fechaEntrega: new Date('2024-01-20'),
      cliente: 'María González',
      direccion: 'Av. Principal 123, Ciudad',
      productos: [
        { 
          nombre: 'Mermelada de Pitahaya Premium', 
          cantidad: 2, 
          precioUnitario: 4.5,
          imagen: '🐉'
        },
        { 
          nombre: 'Mermelada de Mango Tropical', 
          cantidad: 1, 
          precioUnitario: 4.8,
          imagen: '🥭'
        }
      ]
    },
    {
      id: 1002,
      estado: 'Listo para recoger',
      fechaPedido: new Date('2024-01-12'),
      fechaEntrega: new Date('2024-01-18'),
      cliente: 'Carlos Rodríguez',
      direccion: 'Calle Segunda 456, Centro',
      productos: [
        { 
          nombre: 'Mermelada de Granadilla Casera', 
          cantidad: 3, 
          precioUnitario: 4.0,
          imagen: '🟠'
        },
        { 
          nombre: 'Mermelada de Gulupa Exótica', 
          cantidad: 2, 
          precioUnitario: 4.2,
          imagen: '🟣'
        }
      ]
    },
    {
      id: 1003,
      estado: 'Entregado',
      fechaPedido: new Date('2024-01-10'),
      fechaEntrega: new Date('2024-01-15'),
      cliente: 'Ana Martínez',
      direccion: 'Plaza Mayor 789, Zona Norte',
      productos: [
        { 
          nombre: 'Mermelada de Maracuyá Silvestre', 
          cantidad: 2, 
          precioUnitario: 5.2,
          imagen: '🟡'
        },
        { 
          nombre: 'Mermelada de Uchuva Premium', 
          cantidad: 1, 
          precioUnitario: 4.5,
          imagen: '🟨'
        }
      ]
    },
    {
      id: 1004,
      estado: 'Cancelado',
      fechaPedido: new Date('2024-01-08'),
      cliente: 'Luis Pérez',
      direccion: 'Av. Libertad 321, Sur',
      productos: [
        { 
          nombre: 'Mermelada de Pitahaya', 
          cantidad: 1, 
          precioUnitario: 4.3,
          imagen: '🐉'
        }
      ]
    }
  ];

  filtroEstado: string = 'Todos';
  estadosDisponibles: string[] = ['Todos', 'En preparación', 'Listo para recoger', 'Entregado', 'Cancelado'];

  get pedidosFiltrados(): Pedido[] {
    if (this.filtroEstado === 'Todos') {
      return this.pedidos;
    }
    return this.pedidos.filter(p => p.estado === this.filtroEstado);
  }

  cancelarPedido(id: number) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido && pedido.estado !== 'Entregado' && pedido.estado !== 'Cancelado') {
      pedido.estado = 'Cancelado';
    }
  }

  reactivarPedido(id: number) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido && pedido.estado === 'Cancelado') {
      pedido.estado = 'En preparación';
    }
  }

  eliminarPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
  }

  obtenerTotalPedido(pedido: Pedido): number {
    return pedido.productos.reduce((total, p) => total + p.cantidad * p.precioUnitario, 0);
  }

  obtenerClaseEstado(estado: string): string {
    const clases: { [key: string]: string } = {
      'En preparación': 'estado-preparacion',
      'Listo para recoger': 'estado-listo',
      'Entregado': 'estado-entregado',
      'Cancelado': 'estado-cancelado'
    };
    return clases[estado] || 'estado-default';
  }

  cambiarFiltro(estado: string) {
    this.filtroEstado = estado;
  }

  obtenerTotalGeneral(): number {
    return this.pedidosFiltrados.reduce((total, pedido) => total + this.obtenerTotalPedido(pedido), 0);
  }

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}