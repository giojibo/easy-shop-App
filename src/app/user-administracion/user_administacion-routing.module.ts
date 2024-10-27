import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";
import { AdmonClientesComponent } from "./admon-clientes/admon-clientes.component";

const routes: Routes = [
     { 
        path: '', 
        component: PrincipalComponent,
        children: [
             { path: 'administra-clientes', component: AdmonClientesComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserAdministracionRoutingModule {}