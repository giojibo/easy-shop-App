
import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacadeService } from './facade.service';
import { ValidatorService } from './validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private _errorService: ErrorsService,
    public facadeService: FacadeService
  ) { }

  public get errorService(): ErrorsService {
    return this._errorService;
  }
  public set errorService(value: ErrorsService) {
    this._errorService = value;
  }

  // Esquema inicial para un producto
  public esquemaProducto() {
    return {
      'nombre': '',
      'precio': 0,
      'descripcion': '',
      'cantidad': 0,
      'entregas': [],  // Aquí se inicializa como un arreglo vacío
      'foto' : '' // Ruta por defecto si no hay imagen
    };
  }

  // Validación de producto
  public validarProducto(data: any, editar: boolean = false): any {
    console.log("Validando Producto... ", data);
    let error: any = [];

    if (!this.validatorService.required(data['nombre'])) {
      error['nombre'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['descripcion'])) {
      error['descripcion'] = this.errorService.required;
    } else if (!this.validatorService.max(data['descripcion'], 255)) {
      error['descripcion'] = this.errorService.max(255);
    }

    if (data["entregas"].length == 0) {
      error["entregas"] = "Al menos debes seleccionar un lugar de entrega";
    }

    if (!this.validatorService.numeric(data['precio']) || data['precio'] <= 0) {
      error['precio'] = 'El precio debe ser un número positivo';
    }

    if (data['cantidad'] < 0) {
      error['cantidad'] = 'La cantidad no puede ser negativa';
    }

    return error;
  }

  // Registro de producto
  public registrarProducto(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/producto/`, data, httpOptions);
  }

  // Obtener producto por ID
  public obtenerProductoPorId(id: Number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/producto/?id=${id}`, httpOptions);
  }

  // Edición de producto con foto opcional
  public editarProducto(data: any, file?: File): Observable<any> {
    const formData: FormData = new FormData();
    const token = this.facadeService.getSessionToken();
  
    formData.append('id', data.id.toString());
    formData.append('nombre', data.nombre);
    formData.append('precio', data.precio.toString());
    formData.append('descripcion', data.descripcion);
    formData.append('cantidad', data.cantidad.toString());
    formData.append('entregas', data.entregas.toString());

    // Si hay una foto, agregarla al FormData
    if (file) {
      formData.append('foto', file);
    }
  
    // Encabezado para la autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Enviar la solicitud PUT para editar
    return this.http.put<any>(`${environment.url_api}/producto-edit/`, formData, { headers });
  }

  // Obtener lista de productos
  public obtenerListaProductos(): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.url_api}/lista-productos/`, { headers });
  }

  // Eliminar producto
  public eliminarProducto(id: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete<any>(`${environment.url_api}/producto-edit/?id=${id}`, { headers });
  }
}
