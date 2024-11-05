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

  @Input() producto: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idProducto: Number = 0;
  public selectedFile: any;
  public previewUrl: string = 'assets/images/no-product.jpg';

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

  public registrarProducto() {
    this.errors = this.ProductosService.validarProducto(this.producto, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('cantidad', this.producto.cantidad);
    formData.append('foto', this.selectedFile || 'assets/images/no-product.jpg');

    this.ProductosService.registrarProducto(formData).subscribe(
      response => {
        alert('Producto registrado correctamente');
        console.log("Producto registrado: ", response);
        this.router.navigate(['/']);
      },
      error => {
        alert('No se pudo registrar el producto');
      }
    );
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
