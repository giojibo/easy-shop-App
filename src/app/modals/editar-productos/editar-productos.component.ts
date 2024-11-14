import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent implements OnInit{

  constructor(
    private productosServices: ProductosService,
    private dialogRef: MatDialogRef<EditarProductosComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    
  }
  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }
  public editarProducto()
  {
    this.productosServices.editarProducto(this.data.id).subscribe({
      next: (response)=>{
        console.log(response); 
        this.dialogRef.close({isEdit: true});
      }, 
      error: (error)=>{
        this.dialogRef.close({isEdit: false});
      }
    })
  }

}
