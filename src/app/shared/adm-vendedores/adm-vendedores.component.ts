import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendedor } from 'src/app/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VendedoresService } from 'src/app/services/vendedores.service';


import { FacadeService } from 'src/app/services/facade.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { EliminarUserComponent } from 'src/app/modals/eliminar-user/eliminar-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-adm-vendedores',
  templateUrl: './adm-vendedores.component.html',
  styleUrls: ['./adm-vendedores.component.scss']
})
export class AdmVendedoresComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_vendedores: any[] = [];
  public vendedor:any={};

  displayedColumns: string[] = ['id', 'nombre', 'email', 'edad', 'telefono', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<Vendedor>(this.lista_vendedores as Vendedor[]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private vendedoresServices: VendedoresService,
    public facadeService: FacadeService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog

  ){}

  ngOnInit():void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Para paginador
    this.initPaginator();
    this.obtenerVendedores();
  }

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
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public obtenerVendedores(){
    this.vendedoresServices.obtenerListaVendedores().subscribe(
      (response)=>{
        this.lista_vendedores = response;
        console.log("Lista users: ", this.lista_vendedores);
        if(this.lista_vendedores.length > 0){
          //Agregar datos del nombre e email
          this.lista_vendedores.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_vendedores);

          this.dataSource = new MatTableDataSource<Vendedor>(this.lista_vendedores as Vendedor[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

  public goEditar(iduser: number): void{
    this.router.navigate(["registros/vendedor/"+iduser]);
  }

  guardarIdEnLocalStorage(userId: string): void {
    this.facadeService.saveUserIdToLocalStorage(userId);
    console.log("Guardado correctamente");
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserComponent,{
      data: {id: idUser, rol: 'vendedor'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Vendedor eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Vendedor no eliminado ");
        console.log("No se eliminó el vendedor");
      }
    });

  }
}
