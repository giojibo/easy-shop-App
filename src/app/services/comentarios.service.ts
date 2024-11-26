import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) {}

  // Método para obtener la estructura de un comentario
  public esquemaComentario() {
    return {
      productoId: '',
      usuario: '',
      contenido: '',
      calificacion: 0 // Agrega el campo para la calificación
    };
  }

  // Método para validar el comentario
  public validarComentario(data: any) {
    let errores: any = {};

    if (!data["usuario"] || data["usuario"].trim() === '') {
      errores["usuario"] = "El nombre de usuario es requerido.";
    }
    if (!data["contenido"] || data["contenido"].trim() === '') {
      errores["contenido"] = "El contenido del comentario es requerido.";
    }
    if (data["calificacion"] === undefined || data["calificacion"] < 1 || data["calificacion"] > 5) {
      errores["calificacion"] = "La calificación debe estar entre 1 y 5.";
    }
    return errores;
  }

  // Método para registrar un nuevo comentario
  public registrarComentario(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/comentarios/`, data, httpOptions);
  }

  // Método para obtener comentarios de un producto específico
  public obtenerComentarios(productoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_api}/productos/${productoId}/comentarios`, httpOptions);
  }
}
