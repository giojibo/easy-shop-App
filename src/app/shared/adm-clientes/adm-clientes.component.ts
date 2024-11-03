import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/user.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.scss']
})
export class AdmClientesComponent {

  public lista_clientes: any[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'email', 'edad', 'telefono', 'editar', 'eliminar'];
   dataSource = new MatTableDataSource<Cliente>(this.lista_clientes as Cliente[]);

  constructor(
    private clientesServices: ClientesService,

  ){}

  public obtenerClientes(){
    this.clientesServices.obtenerListaClientes().subscribe(
      (response)=>{
        this.lista_clientes = response;
        console.log("Lista users: ", this.lista_clientes);
        if(this.lista_clientes.length > 0){
          //Agregar datos del nombre e email
          this.lista_clientes.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_clientes);

          this.dataSource = new MatTableDataSource<Cliente>(this.lista_clientes as Cliente[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

}
