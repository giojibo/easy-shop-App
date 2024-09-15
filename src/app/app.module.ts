import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistrarAdminComponent } from './partials/registrar-admin/registrar-admin.component';
import { RegistrarVendedorComponent } from './partials/registrar-vendedor/registrar-vendedor.component';
import { RegistrarClienteComponent } from './partials/registrar-cliente/registrar-cliente.component';
import { RegistrarProductosComponent } from './partials/registrar-productos/registrar-productos.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { VendedoresScreenComponent } from './screens/vendedores-screen/vendedores-screen.component';
import { ProductosScreenComponent } from './screens/productos-screen/productos-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { ClientesScreenComponent } from './screens/clientes-screen/clientes-screen.component';
import { RegistrosScreenComponent } from './screens/registros-screen/registros-screen.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BienvenidaComponent } from './screens/bienvenida/bienvenida.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    RegistrarAdminComponent,
    RegistrarVendedorComponent,
    RegistrarClienteComponent,
    RegistrarProductosComponent,
    NavbarComponent,
    AdminScreenComponent,
    VendedoresScreenComponent,
    ProductosScreenComponent,
    LoginScreenComponent,
    ClientesScreenComponent,
    RegistrosScreenComponent,
    BienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
