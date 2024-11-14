import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
import { ProductosService } from '../../services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserComponent } from 'src/app/modals/editar-user/editar-user.component';

declare var $:any;

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-productos.component.html',
  styleUrls: ['./registrar-productos.component.scss']
})
export class RegistrarProductoComponent implements OnInit {

  public producto: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idProducto: Number = 0;
  public selectedFile: any;
  public previewUrl: string = 'assets/images/no-product.jpg';

  public entregas:any[]=[
    {value: '1', nombre:'Ciudad Universitaria (CU)'},
    {value: '2', nombre:'Complejo Cultural Universitario (CCU)'},
    {value: '3', nombre:'Ciudad Universitaria 2 (CU2)'},

  ];

  constructor(
    private ProductosService: ProductosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      this.idProducto = this.activatedRoute.snapshot.params['id'];
      console.log("ID Producto: ", this.idProducto);
      // Aquí iría una llamada para obtener el producto por ID
      this.producto = {};  // Reemplaza con la llamada de servicio si está disponible
      if (this.producto.foto) {
        this.previewUrl = this.producto.foto;
      }
    } else {
      this.producto = this.ProductosService.esquemaProducto();
    }
    console.log("Producto: ", this.producto);
  }

  public regresar() {
    this.location.back();
  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.producto.entregas.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.producto.entregas.forEach((entrega: any, i: any) => {
        if(entrega == event.source.value){
          this.producto.entregas.splice(i,1)
        }
      });
    }
    console.log("Array entregas: ", this.producto);
  }
  public registrarProducto() {
    this.errors = this.ProductosService.validarProducto(this.producto, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('cantidad', this.producto.cantidad);
    formData.append('entregas', this.producto.entregas);
    formData.append('foto', this.selectedFile || 'assets/images/no-product.jpg');

    this.ProductosService.registrarProducto(formData).subscribe(
      response => {
        alert('Producto registrado correctamente');
        console.log("Producto registrado: ", response);
        this.router.navigate(['home']);
      },
      error => {
        alert('No se pudo registrar el producto');
      }
    );
  }

  public revisarSeleccion(nombre: string){
    if(this.producto.entregas){
      var busqueda = this.producto.entregas.find((element: string)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  actualizarProducto() {
    this.errors = this.ProductosService.validarProducto(this.producto, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    const formData = new FormData();
    formData.append('id', this.producto.id);
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('cantidad', this.producto.cantidad);
    formData.append('entregas', this.producto.entregas);
    formData.append('foto', this.selectedFile);

    this.ProductosService.editarProducto(formData).subscribe(
      response => {
        alert("Producto actualizado correctamente");
        console.log("Producto actualizado: ", response);
        this.router.navigate(['/']);
      },
      error => {
        console.error("Error al actualizar el producto", error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  insertPhoto() {
    document.getElementById('file-input')?.click();
  }

  public actualizarFoto(): void {
    if (this.selectedFile && this.producto.id) {
      const data = {
        id: this.producto.id,
        first_name: this.producto.first_name,
        last_name: this.producto.last_name,
        telefono: this.producto.telefono,
        edad: this.producto.edad
      };

      this.ProductosService.editarProducto(data, this.selectedFile).subscribe(
        (response) => {
          console.log("Foto actualizada exitosamente: ", response);
         this.producto = response;// Refrescar los datos para mostrar la imagen actualizada
        },
        (error) => {
          console.error("Error al actualizar la foto", error);
        }
      );
    } else {
      console.warn("No se ha seleccionado ningún archivo o no se ha encontrado el ID del vendedor");
    }
  }
}