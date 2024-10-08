import { Component } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-vendedores-screen',
  templateUrl: './vendedores-screen.component.html',
  styleUrls: ['./vendedores-screen.component.scss']
})
export class VendedoresScreenComponent {
  public vendedor :any = {};

  constructor( 
    private facadeService: FacadeService,
    private vendedoresService: VendedoresService
  )
  {}

  ngOnInit():void{
    this.getVendedorData();
  }

  private getVendedorData(): void {
    const vendedorId = this.facadeService.getUserId(); // Asegúrate de que esto devuelva el ID correcto del vendedor
    
    if (vendedorId) {
        this.vendedoresService.obtenerVendedorPorId('7').subscribe(
            (response) => {
                this.vendedor = response;
                console.log("Datos del vendedor: ", this.vendedor);
            },
            (error) => {
                console.error("Error al obtener los datos del vendedor", error);
            }
        );
    } else {
        console.error("No se encontró el ID del vendedor");
    }
}

}
