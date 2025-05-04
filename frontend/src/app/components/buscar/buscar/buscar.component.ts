// buscar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductoService } from '../../../services/producto/producto.service'; 
import { Producto } from '../../../models/Producto'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  form!: FormGroup;
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Definimos los controles para cada filtro, incluyendo rango de precio
    this.form = this.fb.group({
      sku: [''],
      nombre: [''],
      marca: [''],
      categoria: [''],
      precioMinimo: [''],
      precioMaximo: ['']
    });

    // Carga inicial sin filtros
    this.loadProductos();

    // Al cambiar cualquier filtro, recargar productos (debounce para no spamear)
    this.form.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(() => this.loadProductos());
  
  }

  private loadProductos(): void {
    const filters = this.form.value;
    this.productoService.filtrar(filters).subscribe({
      next: prods => this.productos = prods,
      error: err => console.error('Error al filtrar productos', err)
    });
  }
}
