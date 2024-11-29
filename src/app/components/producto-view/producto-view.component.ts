import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit
{
  public producto?: Producto; 
  public entregas: any[] = [
    { value: '1', nombre: 'Ciudad Universitaria', enlace: 'https://maps.app.goo.gl/uf2wj4QSP4Rb7hLE9' },
    { value: '2', nombre: 'Complejo Cultural Universitario', enlace: 'https://maps.app.goo.gl/h3LrwqBwZ9addgdf7' },
    { value: '3', nombre: 'Ciudad Universitaria 2', enlace: 'https://maps.app.goo.gl/eWxikqYAKmXrLZfz7' }
  ];
  public entregasSeleccionadas: string[] = [];

  constructor(
    private productoServices: ProductosService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap(({ id }) => this.productoServices.obtenerProductoPorId(id)),
    ).subscribe(producto => {
      if (!producto) return this.router.navigate(['producto-view/']);
      this.producto = producto;
      
      // Aquí procesamos las entregas
      this.procesarEntregas(producto.entregas);
      return;
    });
  }

  regresar():void{
    this.router.navigateByUrl('productos');
  }

  procesarEntregas(entregasString: string): void {
    try {
      // Mostrar la cadena para depurar el formato exacto
      console.log('Valor recibido:', entregasString);
  
      // Eliminar los caracteres de escape (\) y limpiar la cadena para asegurar un formato correcto
      let cleanedString = entregasString.replace(/\\"/g, '"').trim();
  
      // Verificar la cadena después de la limpieza
      console.log('Cadena limpia:', cleanedString);
  
      // Si la cadena está entre comillas dobles, las eliminamos
      if (cleanedString.startsWith('"') && cleanedString.endsWith('"')) {
        cleanedString = cleanedString.slice(1, -1);
      }
  
      // Intentar parsear el arreglo JSON
      const entregasArray = JSON.parse(cleanedString);
  
      // Verificamos si el valor parseado es un arreglo
      if (Array.isArray(entregasArray)) {
        // Convertimos los elementos del arreglo a números
        const entregasNumericas = entregasArray.map((value: string) => parseInt(value, 10));
  
        // Buscamos el nombre de entrega correspondiente a cada valor numérico
        this.entregasSeleccionadas = entregasNumericas.map(value => {
          const entrega = this.entregas.find(e => e.value === value.toString());
          return entrega ? entrega.nombre : ''; // Si no se encuentra, asignamos un string vacío
        });
      } else {
        // Si el valor parseado no es un arreglo, lo logueamos
        console.error('El valor recibido no es un arreglo:', cleanedString);
        this.entregasSeleccionadas = [];
      }
    } catch (error) {
      // Si ocurre un error al parsear, lo logueamos
      console.error('Error al parsear las entregas:', error);
      this.entregasSeleccionadas = [];
    }
  }
  getEnlace(nombre: string): string {
    const entrega = this.entregas.find(e => e.nombre === nombre);
    return entrega ? entrega.enlace : '#';  // Devuelve un enlace de Google Maps si se encuentra el lugar, o un '#' si no
  }  
}
