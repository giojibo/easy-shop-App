import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';
import { FacadeService } from './facade.service';
import { ValidatorService } from './validator.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  public get errorService(): ErrorsService {
    return this._errorService;
  }
  public set errorService(value: ErrorsService) {
    this._errorService = value;
  }

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private _errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaAdmin(){
    return {
      'rol':'',
      'clave_admin': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'edad': ''
    }
  }
  public validarAdmin(data: any, editar: boolean){
    console.log("Validando admin... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["clave_admin"])){
      error["clave_admin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato es solo números");
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }
    //Return arreglo
    return error;
  }

  //Servicios HTTP
  //Servicios para registrar un nuevo usuario

  public registrarAdmin(data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/admin/`,data, httpOptions);
  }

  public obtenerListaAdmins (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-admin/`, {headers:headers});
  }

  public getAdminByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/admin/?id=${idUser}`,httpOptions);
  }

   //Servicio para actualizar un usuario
   public editarAdmin (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/admin-edit/`, data, {headers:headers});
  }

  //Eliminar Admin
  public eliminarAdmin(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/admin-edit/?id=${idUser}`,{headers:headers});
  }

  //Obtener el total de cada uno de los usuarios
  public getTotalUsuarios(){
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/admin-edit/`, {headers:headers});
  }
}
