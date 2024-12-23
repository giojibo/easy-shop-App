import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/user.interface';
import { EliminarUserComponent } from 'src/app/modals/eliminar-user/eliminar-user.component';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.scss']
})
export class AdmClientesComponent {

  name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_clientes: any[] = [];
  public cliente:any={};


  displayedColumns: string[] = ['id', 'nombre', 'email', 'edad', 'editar', 'eliminar'];
   dataSource = new MatTableDataSource<Cliente>(this.lista_clientes as Cliente[]);

   @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private clientesServices: ClientesService,
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
    this.obtenerClientes();
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

  public goEditar(iduser: number): void{
    this.router.navigate(["registros/cliente/"+iduser]);
  }

  guardarIdEnLocalStorage(userId: string): void {
    this.facadeService.saveUserIdToLocalStorage(userId);
    console.log("Guardado correctamente");
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserComponent,{
      data: {id: idUser, rol: 'cliente'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Cliente eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Cliente no eliminado ");
        console.log("No se eliminó el cliente");
      }
    });

  }



}
