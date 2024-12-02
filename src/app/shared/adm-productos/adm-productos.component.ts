import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { EliminarProductosComponent } from 'src/app/modals/eliminar-productos/eliminar-productos.component';
import { FacadeService } from 'src/app/services/facade.service';
import { ProductosService } from 'src/app/services/productos.service';

declare var $:any; 

@Component({
  selector: 'app-adm-productos',
  templateUrl: './adm-productos.component.html',
  styleUrls: ['./adm-productos.component.scss']
})
export class AdmProductosComponent {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_productos: any[] = [];
  @Input() datos_productos: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id','nombre','descripcion', 'precio', 'cantidad', 'entregas', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<Producto>(this.lista_productos as Producto[]);
  
  constructor(
    private facadeServices: FacadeService,
    private router: Router,
    private productosServices: ProductosService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

    this.name_user = this.facadeServices.getUserCompleteName();
    this.rol = this.facadeServices.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeServices.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }
    this.obtenerProductos();
    this.initPaginator();
  }
  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }

  public obtenerProductos(){
    this.productosServices.obtenerListaProductos().subscribe(
      (response)=>{
        this.lista_productos = response; 
        console.log("Lista productos: ", this.lista_productos); 
        if(this.lista_productos.length > 0){
          this.lista_productos.forEach(producto => {
            producto.id = producto.id; 
            producto.nombre = producto.nombre; 
          }); 
          console.log("Otros productos: ", this.lista_productos); 
          this.dataSource = new MatTableDataSource<Producto>(this.lista_productos as Producto[]); 
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de productos"); 
      }
    );
  }

  public goEditar(id: number){
    this.router.navigate(["registro-producto/"+id]); 
  }

  public delete(id: number)
  {
    const dialogRef = this.dialog.open(EliminarProductosComponent, 
      {
        data: {id: id}, 
        height:'288px', 
        width: '328px',
      }); 

    dialogRef.afterClosed().subscribe(result =>{
      if(result.isDelete)
      {
        console.log("Producto eliminado");
        window.location.reload(); 
      }
      else
      {
        alert("Producto no eliminado"); 
        console.log("No se eliminó el producto"); 
      }
    });
  }
}
