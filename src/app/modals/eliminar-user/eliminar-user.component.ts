import { Component, Inject, OnInit } from '@angular/core';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-user',
  templateUrl: './eliminar-user.component.html',
  styleUrls: ['./eliminar-user.component.scss']
})
export class EliminarUserComponent implements OnInit{

  public rol: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService,
    private dialogRef: MatDialogRef<EliminarUserComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
    if(this.rol == "administrador"){
      this.administradoresService.eliminarAdmin(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }else if(this.rol == "vendedor"){
      this.vendedoresService.eliminarVendedor(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }/*else if(this.rol == "alumno"){
      this.alumnosService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
    }*/
  }
}
