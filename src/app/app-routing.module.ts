import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistrarAdminComponent } from './partials/registrar-admin/registrar-admin.component';
import { RegistrarVendedorComponent } from './partials/registrar-vendedor/registrar-vendedor.component';
import { RegistrarClienteComponent } from './partials/registrar-cliente/registrar-cliente.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { ClientesScreenComponent } from './screens/clientes-screen/clientes-screen.component';
import { VendedoresScreenComponent } from './screens/vendedores-screen/vendedores-screen.component';
import { ProductosScreenComponent } from './screens/productos-screen/productos-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistrosScreenComponent } from './screens/registros-screen/registros-screen.component';
import { BienvenidaComponent } from './screens/bienvenida/bienvenida.component';
import { RegistrarProductosComponent } from './partials/registrar-productos/registrar-productos.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full'},
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full'},
  { path: 'login', component: LoginScreenComponent, pathMatch: 'full'},
  { path: 'registro-admin', component: RegistrarAdminComponent, pathMatch: 'full'},
  { path: 'registro-vendedor', component: RegistrarVendedorComponent, pathMatch: 'full'},
  { path: 'registro-cliente', component: RegistrarClienteComponent, pathMatch: 'full'},
  { path: 'registro-producto', component: RegistrarProductosComponent, pathMatch: 'full'},
  { path: 'administrador', component: AdminScreenComponent, pathMatch: 'full'},
  { path: 'clientes', component: ClientesScreenComponent, pathMatch: 'full'},
  { path: 'vendedores', component: VendedoresScreenComponent, pathMatch: 'full'},
  { path: 'vendedores/:rol/:id', component: VendedoresScreenComponent, pathMatch: 'full'},
  { path: 'productos', component: ProductosScreenComponent, pathMatch: 'full'},
  { path: 'registros', component: RegistrosScreenComponent, pathMatch: 'full'},
  { path: 'registros/:rol/:id', component: RegistrosScreenComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
