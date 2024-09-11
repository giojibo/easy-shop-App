import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistrarAdminComponent } from './partials/registrar-admin/registrar-admin.component';
import { RegistrarVendedorComponent } from './partials/registrar-vendedor/registrar-vendedor.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent, pathMatch: 'full'},
  { path: 'registra-admin', component: RegistrarAdminComponent, pathMatch: 'full'},
  { path: 'registar-vendedor', component: RegistrarVendedorComponent, pathMatch: 'full'},
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
