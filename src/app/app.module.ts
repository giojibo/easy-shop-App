import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistrarAdminComponent } from './partials/registrar-admin/registrar-admin.component';
import { RegistrarVendedorComponent } from './partials/registrar-vendedor/registrar-vendedor.component';
import { RegistrarClienteComponent } from './partials/registrar-cliente/registrar-cliente.component';
import { RegistrarProductoComponent } from './partials/registrar-productos/registrar-productos.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { VendedoresScreenComponent } from './screens/vendedores-screen/vendedores-screen.component';
import { ProductosScreenComponent } from './screens/productos-screen/productos-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { ClientesScreenComponent } from './screens/clientes-screen/clientes-screen.component';
import { RegistrosScreenComponent } from './screens/registros-screen/registros-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BienvenidaComponent } from './screens/bienvenida/bienvenida.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { EditarUserComponent } from './modals/editar-user/editar-user.component';
import { AdmClientesComponent } from './shared/adm-clientes/adm-clientes.component';
import { AdmVendedoresComponent } from './shared/adm-vendedores/adm-vendedores.component';
import { AdmProductosComponent } from './shared/adm-productos/adm-productos.component';
import { EliminarUserComponent } from './modals/eliminar-user/eliminar-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from './components/card-component/card.component';
import { MatChipsModule } from '@angular/material/chips';
import { AdmAdministradoresComponent } from './shared/adm-administradores/adm-administradores.component';
import { EditarProductosComponent } from './modals/editar-productos/editar-productos.component';
import { EliminarProductosComponent } from './modals/eliminar-productos/eliminar-productos.component';
import { ProductoViewComponent } from './components/producto-view/producto-view.component';
import { ComentariosComponent } from './partials/comentarios/comentarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    RegistrarAdminComponent,
    RegistrarVendedorComponent,
    RegistrarClienteComponent,
    RegistrarProductoComponent,
    NavbarComponent,
    AdminScreenComponent,
    VendedoresScreenComponent,
    ProductosScreenComponent,
    LoginScreenComponent,
    ClientesScreenComponent,
    RegistrosScreenComponent,
    BienvenidaComponent,
    EditarUserComponent,
    AdmClientesComponent,
    AdmVendedoresComponent,
    AdmProductosComponent,
    EliminarUserComponent,
    CardComponent,
    AdmAdministradoresComponent,
    EditarProductosComponent,
    EliminarProductosComponent,
    ProductoViewComponent,
    ComentariosComponent,
    PerfilComponent,
    PerfilClienteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, 
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule, 
    MatButtonModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTooltipModule
    
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
