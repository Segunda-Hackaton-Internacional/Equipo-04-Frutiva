import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar/buscar.component';
import { AuthGuard } from './auth.guard';
import { DetallesProductoComponent } from './components/detalles-producto/detalles-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'registro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard] },
    { path: 'detalles-producto/:id', component: DetallesProductoComponent, canActivate: [AuthGuard] },
    { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
    { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] }
];
