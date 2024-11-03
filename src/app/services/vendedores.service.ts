import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacadeService } from './facade.service';
import { ValidatorService } from './validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders ()
}

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  public get errorService(): ErrorsService{
    return this._errorService;
  }
  public set errorsService(value: ErrorsService){
    this._errorService = value;
  }
  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private _errorService: ErrorsService,
    public facadeService: FacadeService
  ) { }

  public esquemaVendedor(){
    return{
      'rol': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'edad': '',
      'telefono': '',
      'password': '',
      'confirmar_password': '',
      'foto': ''
    }
  }

  public validarVendedor(data: any, editar: boolean){
    console.log("Validando vendedor... ", data);
    let error: any = [];

   /* if(!this.validatorService.required(data["id"])){
      error["id"] = this.errorService.required;
    }*/

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

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
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

    return error;
  }

  public registrarVendedor(data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/vendedor/`,data, httpOptions);
  }
  public obtenerVendedorPorId(id: Number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/vendedor/?id=${id}`, httpOptions);
  }

  public editarVendedor(data: any, file?: File): Observable<any> {
    const formData: FormData = new FormData();
    const token = this.facadeService.getSessionToken();
  
    formData.append('id', data.id.toString());    
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('edad', data.edad.toString());
    formData.append('telefono', data.telefono);
    
    if (file) {
      formData.append('foto', file); // Cambia 'foto' si el backend espera otro nombre
    }
  
    // Encabezado para la autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Enviar la solicitud sin configurar explícitamente el Content-Type
    return this.http.put<any>(`${environment.url_api}/vendedor-edit/`, formData, { headers });
  }

  public obtenerListaVendedores (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-vendedor/`, {headers:headers});
  }
  
  public eliminarVendedor(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/vendedor-edit/?id=${idUser}`,{headers:headers});
  }
}