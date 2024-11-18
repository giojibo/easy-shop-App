import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-screen',
  templateUrl: './productos-screen.component.html',
  styleUrls: ['./productos-screen.component.scss']
})
export class ProductosScreenComponent implements OnInit {
  public lista_productos: Producto[] = [];
  public previewUrl: string = '/assets/images/no-product.jpg';
  public producto: any = {};

  constructor(
    private productosServices: ProductosService,
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  public obtenerProductos(): void {
    this.productosServices.obtenerListaProductos().subscribe(
      response => {
        this.lista_productos = response;
        console.log("Lista de productos:", this.lista_productos);
      },
      error => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
  }

}
