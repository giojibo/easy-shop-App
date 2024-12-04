import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { FacadeService } from 'src/app/services/facade.service';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public producto!: Producto;  // Recibe el producto del componente padre
  public previewUrl: string = '/assets/images/no-product.jpg';  // Imagen predeterminada
  @Input() datos_productos: any = []; 
  public lista_productos: Producto[] = [];
  public url: string = environment.url_api;
  token: string = "";
  rol: string = "";

  constructor(
    private productosServices: ProductosService,
    private router: Router, 
    private facadeServices: FacadeService,
  ) {}

  ngOnInit(): void {
    
    // Si el producto tiene una URL de foto, úsala; si no, usa la imagen predeterminada
    
    this.obtenerProductos();
    this.token = this.facadeServices.getSessionToken();
    this.rol = this.facadeServices.getUserGroup();
  }

  public goEditar(id: number): void{
    this.router.navigate(["registro-producto/"+id]); 
  }

  public verProducto(id: number): void{
    this.router.navigate(["producto-view/"+ id]);
  }
  public obtenerProductos(): void {
  this.productosServices.obtenerListaProductos().subscribe(
    response => {
      this.lista_productos = response.map((producto: Producto) => ({
        ...producto,
        foto: producto.foto ? this.url + producto.foto : '/assets/images/no-product.jpg'
      }));
      console.log("Lista de productos:", this.lista_productos);
    },
    error => {
      console.error('Error al obtener la lista de productos:', error);
    }
  );
}

}
