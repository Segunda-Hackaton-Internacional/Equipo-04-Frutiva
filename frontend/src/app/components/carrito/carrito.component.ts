import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProductoCarrito {
  nombre: string;
  marca: string;
  precioUnitario: number;
  cantidad: number;
  imagen: string;
  descripcion: string;
}

interface Moneda {
  codigo: string;
  nombre: string;
  simbolo: string;
  bandera: string;
  tasaCambio: number; // Tasa de cambio respecto al dólar estadounidense
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  // Monedas disponibles con sus tasas de cambio (respecto al USD)
  monedas: Moneda[] = [
    { codigo: 'USD', nombre: 'Dólar Estadounidense', simbolo: '$', bandera: '🇺🇸', tasaCambio: 1 },
    { codigo: 'EUR', nombre: 'Euro', simbolo: '€', bandera: '🇪🇺', tasaCambio: 0.92 },
    { codigo: 'COP', nombre: 'Peso Colombiano', simbolo: '$', bandera: '🇨🇴', tasaCambio: 4250 },
    { codigo: 'JPY', nombre: 'Yen Japonés', simbolo: '¥', bandera: '🇯🇵', tasaCambio: 148 },
    { codigo: 'CRC', nombre: 'Colón Costarricense', simbolo: '₡', bandera: '🇨🇷', tasaCambio: 540 }
  ];

  monedaSeleccionada: Moneda = this.monedas[0]; // Por defecto USD

  productos: ProductoCarrito[] = [
    {
      nombre: 'Mermelada de Pitahaya Premium',
      marca: 'DelCampo',
      precioUnitario: 6.5,
      cantidad: 2,
      imagen: 'assets/pitahaya-fruta.jpg',
      descripcion: 'Exótica mermelada de pitahaya fresca, sabor único y tropical sin conservantes artificiales'
    },
    {
      nombre: 'Mermelada de Granadilla Artesanal',
      marca: 'NaturalFruit',
      precioUnitario: 5.8,
      cantidad: 1,
      imagen: 'assets/granadilla-fruta.jpg',
      descripcion: 'Mermelada premium de granadilla dulce, elaborada con frutos seleccionados'
    },
    {
      nombre: 'Mermelada de Gulupa Silvestre',
      marca: 'Frutalia',
      precioUnitario: 7.2,
      cantidad: 3,
      imagen: 'assets/gulupa-fruta.jpg',
      descripcion: 'Intenso sabor agridulce de gulupa silvestre, perfecta para desayunos gourmet'
    },
    {
      nombre: 'Mermelada de Maracuyá Tradicional',
      marca: 'TierraDulce',
      precioUnitario: 5.5,
      cantidad: 1,
      imagen: 'assets/maracuya-fruta.jpg',
      descripcion: 'Tradicional mermelada de maracuyá con el auténtico sabor tropical colombiano'
    },
    {
      nombre: 'Mermelada de Mango de Azúcar',
      marca: 'TropicalDelight',
      precioUnitario: 4.8,
      cantidad: 2,
      imagen: 'assets/mango-fruta.jpg',
      descripcion: 'Dulce mermelada de mango de azúcar, variedad premium de los valles colombianos'
    },
    {
      nombre: 'Mermelada de Uchuva Dorada',
      marca: 'AndeanFruits',
      precioUnitario: 6.0,
      cantidad: 1,
      imagen: 'assets/uchuva-fruta.jpg',
      descripcion: 'Exclusiva mermelada de uchuva dorada, superfruit andino con propiedades antioxidantes'
    }
  ];

  // Método para cambiar moneda
  cambiarMoneda(moneda: Moneda): void {
    this.monedaSeleccionada = moneda;
  }

  // Convertir precio de USD a la moneda seleccionada
  convertirPrecio(precioUSD: number): number {
    return precioUSD * this.monedaSeleccionada.tasaCambio;
  }

  // Formatear precio según la moneda
  formatearPrecio(precio: number): string {
    const precioConvertido = this.convertirPrecio(precio);
    
    // Formateo específico por moneda
    switch (this.monedaSeleccionada.codigo) {
      case 'USD':
      case 'EUR':
        return precioConvertido.toFixed(2);
      case 'COP':
      case 'CRC':
        return Math.round(precioConvertido).toLocaleString();
      case 'JPY':
        return Math.round(precioConvertido).toString();
      default:
        return precioConvertido.toFixed(2);
    }
  }

  // Obtener símbolo de moneda con formato
  obtenerSimboloMoneda(): string {
    return this.monedaSeleccionada.simbolo;
  }

  aumentarCantidad(index: number): void {
    this.productos[index].cantidad++;
  }

  disminuirCantidad(index: number): void {
    if (this.productos[index].cantidad > 1) {
      this.productos[index].cantidad--;
    } else {
      this.eliminarProducto(index);
    }
  }

  obtenerTotal(): number {
    return this.productos.reduce((total, prod) => total + prod.precioUnitario * prod.cantidad, 0);
  }

  obtenerCantidadTotal(): number {
    return this.productos.reduce((total, prod) => total + prod.cantidad, 0);
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
  }

  procederAlPago(): void {
    if (this.productos.length > 0) {
      const totalUSD = this.obtenerTotal();
      const totalMonedaSeleccionada = this.convertirPrecio(totalUSD);
      
      console.log('Procesando pago...', {
        productos: this.productos,
        totalUSD: totalUSD,
        totalMonedaSeleccionada: totalMonedaSeleccionada,
        moneda: this.monedaSeleccionada,
        cantidadTotal: this.obtenerCantidadTotal()
      });
      
      alert(`Procesando pago por ${this.obtenerSimboloMoneda()}${this.formatearPrecio(totalUSD)} ${this.monedaSeleccionada.codigo}`);
    }
  }

  continuarComprando(): void {
    console.log('Redirigiendo a la tienda...');
    alert('Redirigiendo a la tienda...');
  }
}