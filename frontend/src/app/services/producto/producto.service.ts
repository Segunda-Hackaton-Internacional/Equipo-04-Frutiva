import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  
  getProductoPorSuId(productoId: number): Observable<Producto> {
    const headers = this.createHeaders();
    return this.http.get<Producto>(`${this.baseUrl}/${productoId}`, { headers });
  }

  filtrar(filters: any): Observable<Producto[]> {
    const headers = this.createHeaders();

    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const val = filters[key];
      if (val !== null && val !== undefined && val !== '') {
        params = params.set(key, val);
      }
    });
    return this.http.get<Producto[]>(`${this.baseUrl}/filter`, { params, headers });
  }
}
