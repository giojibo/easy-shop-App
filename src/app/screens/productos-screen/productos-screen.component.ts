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
  
  constructor(
    //private productosServices: ProductosService,
  ) {}

  ngOnInit(): void {
   
  }

}
