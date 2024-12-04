import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-clientes-screen',
  templateUrl: './clientes-screen.component.html',
  styleUrls: ['./clientes-screen.component.scss']
})
export class ClientesScreenComponent implements OnInit{
  //public vendedor: { user?:{ first_name?: string } }= {};
  public clientes: any = {};

  constructor( 
    private facadeService: FacadeService,
    private ClientesService: ClientesService,
    private router: Router,
    private activateRouter: ActivatedRoute
  )
  {}



  ngOnInit():void{
    this.getClienteData();
  }

  private getClienteData(): void {
    const clienteId = Number(this.facadeService.getUserIdFromLocalStorage()); // Obtener el ID desde localStorage
  
    if (clienteId) {
      this.ClientesService.obtenerClientePorId(clienteId).subscribe(
        (response) => {
          this.clientes = response;
          console.log("Datos del cliente obtenidos: ", this.clientes);
        },
        (error) => {
          console.error("Error al obtener los datos del cliente", error);
        }
      );
    } else {
      console.error("No se encontró el ID del cliente");
    }
  }

  public editarPerfil(iduser: Number)
  {
    this.router.navigate(["registros/cliente/"+iduser]);
  }

  public verPerfil(iduser: Number)
  {
    this.router.navigate(["perfil-cliente/"+iduser])
  }

  

}

