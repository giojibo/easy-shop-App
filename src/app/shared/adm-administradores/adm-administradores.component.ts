import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/interfaces/user.interface';
import { EliminarUserComponent } from 'src/app/modals/eliminar-user/eliminar-user.component';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-adm-administradores',
  templateUrl: './adm-administradores.component.html',
  styleUrls: ['./adm-administradores.component.scss']
})
export class AdmAdministradoresComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_admins: any[] = [];
  public administrador:any={};

  displayedColumns: string[] = ['clave_admin', 'nombre', 'email', 'edad', 'telefono', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<Administrador>(this.lista_admins as Administrador[]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private administradoresServices: AdministradoresService,
    private facadeServices: FacadeService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ){}

  ngOnInit():void {
    this.name_user = this.facadeServices.getUserCompleteName();
    this.rol = this.facadeServices.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeServices.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Para paginador
    this.initPaginator();
    this.obtenerAdministradores();
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

  public obtenerAdministradores(){
    this.administradoresServices.obtenerListaAdmins().subscribe(
      (response)=>{
        this.lista_admins = response; 
        console.log("Lista users: ", this.lista_admins);
        if(this.lista_admins.length > 0){
          this.lista_admins.forEach(usuario => {
            usuario.first_name = usuario.user.first_name; 
            usuario.last_name = usuario.user.last_name; 
            usuario.email = usuario.user.email; 
          }); 
          console.log("Otro user: ", this.lista_admins); 
          this.dataSource = new MatTableDataSource<Administrador>(this.lista_admins as Administrador[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }
  public goEditar(iduser: number): void{
    this.router.navigate(["registros/administrador/"+iduser]); 
  }
  guardarIdEnLocalStorage(userId: string): void {
    this.facadeServices.saveUserIdToLocalStorage(userId);
    console.log("Guardado correctamente");
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserComponent,{
      data: {id: idUser, rol: 'administrador'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Administrador eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Administrador no eliminado ");
        console.log("No se eliminó el administrador");
      }
    });

  }




}
