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
  viewMode: 'grid' | 'list' = 'grid';
  isLoading = false;
  filterStates: { [key: string]: boolean } = {
    sku: false,
    nombre: false,
    marca: false,
    categoria: false,
    precio: false
  };

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
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.loadProductos());
  }

  private loadProductos(): void {
    this.isLoading = true;
    const filters = this.form.value;
    
    this.productoService.filtrar(filters).subscribe({
      next: prods => {
        this.productos = prods;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al filtrar productos', err);
        this.isLoading = false;
      }
    });
  }

  toggleView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  toggleFilter(filterName: string): void {
    this.filterStates[filterName] = !this.filterStates[filterName];
  }

  clearFilters(): void {
    this.form.reset();
    // Cerrar todos los filtros
    Object.keys(this.filterStates).forEach(key => {
      this.filterStates[key] = false;
    });
    this.loadProductos();
  }

  getProductCount(): number {
    return this.productos.length;
  }
}