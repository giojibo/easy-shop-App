import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Vendedor } from 'src/app/interfaces/user.interface';
import { EliminarUserComponent } from 'src/app/modals/eliminar-user/eliminar-user.component';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  
  public vendedor?: Vendedor; 

  constructor (
    private vendedoresServices: VendedoresService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap(({id}) => this.vendedoresServices.obtenerVendedorPorId(id)),
    ).subscribe(vendedor =>{
      if(!vendedor) return this.router.navigate(['home']);
      this.vendedor = vendedor;
      console.log(this.vendedor)
      return;
    })
  }

  regresar():void{
    this.router.navigateByUrl('home');
  }

  eliminar(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserComponent,{
      data: {id: idUser, rol: 'vendedor'}, //Se pasan valores a través del componente
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
