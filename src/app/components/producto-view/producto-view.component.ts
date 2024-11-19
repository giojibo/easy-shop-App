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

  constructor(
    private productoServices: ProductosService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap(({id})=> this.productoServices.obtenerProductoPorId(id)),
    ).subscribe( producto => {
      if(!producto) return this.router.navigate(['producto-view/']);
      this.producto = producto;
      return; 
    })
  }

  regresar():void{
    this.router.navigateByUrl('productos');
  }
}
