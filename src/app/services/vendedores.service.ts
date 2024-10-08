import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacadeService } from './facade.service';
import { ValidatorService } from './validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json' })
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
  public obtenerVendedorPorId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/vendedor/?id=${id}`, httpOptions);
  }
  
}