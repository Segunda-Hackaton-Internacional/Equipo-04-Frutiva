import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa RouterModule aquí
import { ProductoService } from '../../services/producto/producto.service'; 
import { Producto } from '../../models/Producto'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- IMPORTANTE
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {
  producto!: Producto;
  mensaje: string = '';


  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerdetallesproducto(Number(id));
    }
  }

  obtenerdetallesproducto(id: number): void {
    this.productoService.getProductoPorSuId(id).subscribe({
      next: (producto) => {
        this.producto = producto;
      },
      error: (err) => {
        console.error('Error al obtener los detalles del producto', err);
        this.mensaje = `Error al cargar los detalles: ${err.message || err.toString()}`;
      }
    });
  }


  agregarAlCarrito(): void {
    console.log('Agregado al carrito:', this.producto);
  }
}
