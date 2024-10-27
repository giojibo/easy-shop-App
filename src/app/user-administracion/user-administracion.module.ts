import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmonClientesComponent } from './admon-clientes/admon-clientes.component';
import { UserAdministracionRoutingModule } from './user_administacion-routing.module';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
    AdmonClientesComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    UserAdministracionRoutingModule,
  ]
})
export class UserAdministracionModule { }

