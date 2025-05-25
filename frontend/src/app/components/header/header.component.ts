import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

ngOnInit() {
  if (typeof window !== 'undefined' && window.localStorage) {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}


  irHome()       { this.router.navigate(['/home']); }
  irExplorar()   { this.router.navigate(['/buscar']); }
  irCarrito()    { this.router.navigate(['/carrito']); }
  irPedidos()    { this.router.navigate(['/pedidos']); }
  irLogin()      { this.router.navigate(['/login']); }
  irRegister()   { this.router.navigate(['/registro']); }
  irBlog()       { this.router.navigate(['/blog']); }
  irRecetas()       { this.router.navigate(['/recetas']); }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
