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
import { RegistrarProductoComponent } from './partials/registrar-productos/registrar-productos.component';
import { AdmClientesComponent } from './shared/adm-clientes/adm-clientes.component';
import { AdmVendedoresComponent } from './shared/adm-vendedores/adm-vendedores.component';
import { AdmProductosComponent } from './shared/adm-productos/adm-productos.component';
import { AdmAdministradoresComponent } from './shared/adm-administradores/adm-administradores.component';
import { ProductoViewComponent } from './components/producto-view/producto-view.component';
import { ComentariosComponent } from './partials/comentarios/comentarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guard/auth.guard';
import { publicGuard } from './guard/public.guard';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';


const routes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full', canActivate: [publicGuard]},
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'login', component: LoginScreenComponent, pathMatch: 'full', canActivate: [publicGuard] },
  { path: 'registro-admin', component: RegistrarAdminComponent, pathMatch: 'full'},
  { path: 'registro-vendedor', component: RegistrarVendedorComponent, pathMatch: 'full', canActivate: [publicGuard]},
  { path: 'registro-cliente', component: RegistrarClienteComponent, pathMatch: 'full', canActivate: [publicGuard]},
  { path: 'registro-producto', component: RegistrarProductoComponent, pathMatch: 'full'},
  { path: 'registro-producto/:id', component: RegistrarProductoComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'administrador', component: AdminScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'clientes', component: ClientesScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'clientes/:rol/:id', component: ClientesScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'vendedores', component: VendedoresScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'vendedores/:rol/:id', component: VendedoresScreenComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'productos', component: ProductosScreenComponent, pathMatch: 'full'},
  { path: 'productos:id', component: ProductosScreenComponent, pathMatch: 'full'},
  { path: 'registros', component: RegistrosScreenComponent, pathMatch: 'full'},
  { path: 'registros/:rol/:id', component: RegistrosScreenComponent, pathMatch: 'full'},
  { path: 'adm-clientes', component: AdmClientesComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'adm-vendedores', component: AdmVendedoresComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'adm-administradores', component: AdmAdministradoresComponent, pathMatch: 'full'},
  { path: 'adm-productos', component: AdmProductosComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'producto-view/:id', component: ProductoViewComponent, pathMatch: 'full'},
  { path: 'comentarios', component: ComentariosComponent, pathMatch: 'full'},
  { path: 'perfil/:id', component: PerfilComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'perfil-cliente/:id', component: PerfilClienteComponent, pathMatch:'full', canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
