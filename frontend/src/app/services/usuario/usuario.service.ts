import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import axios from 'axios';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api';
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  crearUsuario(usuario: Usuario): Promise<Usuario> {
    return axios.post<Usuario>(`${this.apiUrl}/auth/register`, usuario)
      .then(response => response.data);
  }

  iniciarSesion(correo: string, contrasenia: string): Promise<string | null> {
    return axios.post<{ token: string }>(`${this.apiUrl}/auth/login`, { correo, contrasenia })
      .then(response => {
        const token = response.data.token;
        if (token && this.isBrowser) {
          localStorage.setItem('token', token);
        }
        return token;
      })
      .catch(() => null);
  }

  getUsuarioActual(): Promise<Usuario | null> {
    if (!this.isBrowser) {
      return Promise.resolve(null);
    }
    const token = localStorage.getItem('token');
    if (token) {
      return axios.get<Usuario>(`${this.apiUrl}/usuarios/usuarioActual`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => response.data)
        .catch(() => null);
    }
    return Promise.resolve(null);
  }

  updateUsuario(usuario: Usuario): Promise<Usuario> {
    if (!this.isBrowser) {
      return Promise.reject('No hay entorno de navegador');
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject('No hay token disponible');
    }
    return axios.put<Usuario>(`${this.apiUrl}/usuarios/id`, usuario, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error actualizando el usuario:', error);
        throw error;
      });
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }
}
