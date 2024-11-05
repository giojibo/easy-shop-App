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
      nombre: '',
      precio: 0,
      descripcion: '',
      cantidad: 0,
      foto: 'assets/images/no-image.png' // Ruta por defecto si no hay imagen
    };
  }

  // Validación de producto
  public validarProducto(data: any, editar: boolean = false): any {
    let error: any = [];

    if (!this.validatorService.required(data['nombre'])) {
      error['nombre'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['descripcion'])) {
      error['descripcion'] = this.errorService.required;
    } else if (!this.validatorService.max(data['descripcion'], 255)) {
      error['descripcion'] = this.errorService.max(255);
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
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(`${environment.url_api}/producto/registrar`, data, { headers });
  }

  // Obtener producto por ID
  public obtenerProductoPorId(id: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.url_api}/producto/?id=${id}`, { headers });
  }

  // Editar producto
  public editarProducto(data: any, file?: File): Observable<any> {
    const formData: FormData = new FormData();
    const token = this.facadeService.getSessionToken();

    formData.append('id', data.id.toString());
    formData.append('nombre', data.nombre);
    formData.append('precio', data.precio.toString());
    formData.append('descripcion', data.descripcion);
    formData.append('cantidad', data.cantidad.toString());

    if (file) {
      formData.append('foto', file); // Cambia 'foto' si el backend espera otro nombre
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${environment.url_api}/producto/editar`, formData, { headers });
  }

  // Obtener lista de productos
  public obtenerListaProductos(): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.url_api}/lista-productos`, { headers });
  }

  // Eliminar producto
  public eliminarProducto(id: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${environment.url_api}/producto/?id=${id}`, { headers });
  }
}
