import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cliente } from 'src/app/interfaces/user.interface';
import { EliminarUserComponent } from 'src/app/modals/eliminar-user/eliminar-user.component';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit{

  public clientes?: Cliente; 

  constructor(
    private clientesService: ClientesService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog

  ){}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap(({id}) => this.clientesService.obtenerClientePorId(id)),
    ).subscribe(clientes =>{
      if(!clientes) return this.router.navigate(['home']);
      this.clientes = clientes;
      console.log(this.clientes)
      return;
    })

  }

  regresar():void{
    this.router.navigateByUrl('home');
  }

  eliminar(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserComponent,{
      data: {id: idUser, rol: 'clientes'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Perfil eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Peril no eliminado ");
        console.log("No se eliminó el perfil");
      }
    });
  }


}
