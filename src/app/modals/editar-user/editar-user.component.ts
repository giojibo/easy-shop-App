import { Component, Inject } from '@angular/core';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent {
  public rol: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private vendedoresService: VendedoresService,
    private clientesService: ClientesService,
    private dialogRef: MatDialogRef<EditarUserComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }
  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  public editarUser(){
    if(this.rol == "administrador"){
      this.administradoresService.editarAdmin(this.data.id).subscribe(
        (reponse)=>{
          console.log(reponse);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false})
        }
      );
    }else if(this.rol == "vendedor"){
      this.vendedoresService.editarVendedor(this.data.id).subscribe(
        (reponse)=>{
          console.log(reponse);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false})
        }
      );
    }else if(this.rol == "cliente"){
      this.clientesService.editarCliente(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false});
        }
      );
    }
  }
}
