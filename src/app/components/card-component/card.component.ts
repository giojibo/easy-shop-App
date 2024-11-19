import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { ProductosService } from 'src/app/services/productos.service';

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
  public url: string = 'http://127.0.0.1:8000';

  constructor(
    private productosServices: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    // Si el producto tiene una URL de foto, úsala; si no, usa la imagen predeterminada
    if (this.producto.foto) {
      this.previewUrl = (this.url + this.producto.foto);
    }
  }

  public goEditar(id: number): void{
    this.router.navigate(["registro-producto/"+id]); 
  }

  public verProducto(id: number): void{
    this.router.navigate(["producto-view/"+ id]);
  }
}
