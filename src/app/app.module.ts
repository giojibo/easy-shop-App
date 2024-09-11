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
@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    RegistrarAdminComponent,
    RegistrarVendedorComponent,
    RegistrarClienteComponent,
    RegistrarProductosComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
