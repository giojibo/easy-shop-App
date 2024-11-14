import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-eliminar-productos',
  templateUrl: './eliminar-productos.component.html',
  styleUrls: ['./eliminar-productos.component.scss']
})
export class EliminarProductosComponent implements OnInit{

  constructor(
    private productosServices: ProductosService,
    private dialogRef: MatDialogRef<EliminarProductosComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {

  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarProducto()
  {
    this.productosServices.eliminarProducto(this.data.id).subscribe(
      (response)=>{
        console.log(response); 
        this.dialogRef.close({isDelete: true}); 
      }, (error)=> {
        this.dialogRef.close({isDelete:false});
      }
    )
  }
}
