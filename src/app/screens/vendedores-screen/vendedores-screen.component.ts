import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-vendedores-screen',
  templateUrl: './vendedores-screen.component.html',
  styleUrls: ['./vendedores-screen.component.scss']
})
export class VendedoresScreenComponent implements OnInit{
  //public vendedor: { user?:{ first_name?: string } }= {};
  public vendedor: any = {};

  constructor( 
    private facadeService: FacadeService,
    private vendedoresService: VendedoresService,
    private router: Router,
    private activateRouter: ActivatedRoute
  )
  {}



  ngOnInit():void{
    this.getVendedorData();
  }

  private getVendedorData(): void {
    const vendedorId = this.facadeService.getUserIdFromLocalStorage(); // Obtener el ID desde localStorage
  
    if (vendedorId) {
      this.vendedoresService.obtenerVendedorPorId(vendedorId).subscribe(
        (response) => {
          this.vendedor = response;
          console.log("Datos del vendedor obtenidos: ", this.vendedor);
        },
        (error) => {
          console.error("Error al obtener los datos del vendedor", error);
        }
      );
    } else {
      console.error("No se encontró el ID del vendedor");
    }
  }

  public registrar_producto()
{
  this.router.navigate(["registro-producto"])
}
}
