import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
import { ProductosService } from '../../services/productos.service';
import { EditarUserComponent } from 'src/app/modals/editar-user/editar-user.component';
import { FormControl } from '@angular/forms';
import { EditarProductosComponent } from 'src/app/modals/editar-productos/editar-productos.component';
import { MatDialog } from '@angular/material/dialog';

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
  public seleccion = new FormControl; 
  public selectedFile: any;
  public previewUrl: string = 'assets/images/no-product.jpg';

  public entregas:any[]=[
    {value: '1', nombre:'Ciudad Universitaria'},
    {value: '2', nombre:'Complejo Cultural Universitario'},
    {value: '3', nombre:'Ciudad Universitaria 2'},

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
      this.obtenerProductoPorId();
    } else {
      this.producto = this.ProductosService.esquemaProducto();
      this.producto.entregas = this.producto.entregas || []; // Asegura que entregas sea un arreglo
    }
    console.log("Producto: ", this.producto);
  }

  public regresar() {
    this.location.back();
  }

  checkboxChange(event: any): void {
    const value = event.source.value;
  
    // Asegura que entregas sea un arreglo
    if (!Array.isArray(this.producto.entregas)) {
      this.producto.entregas = [];
    }
  
    if (event.checked) {
      // Agrega solo si no existe
      if (!this.revisarSeleccion(value)) {
        this.producto.entregas.push(value);
      }
    } else {
      // Elimina el valor del array
      this.producto.entregas = this.producto.entregas.filter((entrega: any) => entrega !== value);
    }
  
    console.log("Array entregas actualizado: ", this.producto.entregas);
  }
  

  
  
  
  public registrarProducto() {

    this.errors = []; 
    this.errors = this.ProductosService.validarProducto(this.producto, this.editar);

    if(!this.selectedFile)
    {
      this.producto.foto = 'assets/images/no-product.jpg';
    }

    else{

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('cantidad', this.producto.cantidad);
    formData.append('entregas', this.producto.entregas);
    formData.append('foto', this.selectedFile);

    this.ProductosService.registrarProducto(formData).subscribe(
      (response) => {
        alert('Producto registrado correctamente');
        console.log("Producto registrado: ", response);
        this.router.navigate(['home']);
      },
      (error) => {
        alert('No se pudo registrar el producto');
      }
    );
  }
}

public revisarSeleccion(value: string): boolean {
  // Verifica si el valor existe en el array
  return this.producto.entregas.includes(value);
}

  actualizarProducto() {
    this.errors = []; 
    this.errors = this.ProductosService.validarProducto(this.producto, this.editar); 

    if (!$.isEmptyObject(this.errors)) {
      return;
    }
    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarProductosComponent, {
      data: {id: this.producto},
      height: '288px',
      width: '328px',
    }); 

    dialogRef.afterClosed().subscribe((result: { isEdit: any; }) => {
      if (result && result.isEdit) {
        console.log("Producto editado");
        // Recargar página o redirigir al home
        this.router.navigate(["home"]);
      } else {
        alert("Producto no editada ");
        console.log("No se editó el producto");
      }
    });
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
    if (this.selectedFile && this.producto?.id) {
      const formData = new FormData();
      
      formData.append('id', this.producto.id.toString());
      formData.append('nombre', this.producto.nombre || ''); // Valor predeterminado si no existe
      formData.append('precio', this.producto.precio?.toString() || '0'); // Asegura que precio no sea undefined
      formData.append('cantidad', this.producto.cantidad?.toString() || '0'); // Asegura que cantidad no sea undefined
      formData.append('entregas', JSON.stringify(this.producto.entregas || [])); // Predetermina entregas a un arreglo vacío
      formData.append('foto', this.selectedFile);
  
      this.ProductosService.editarProducto(formData).subscribe(
        (response) => {
          console.log("Foto actualizada exitosamente: ", response);
          this.producto = response; // Refresca los datos del producto
          window.location.reload(); // Recarga la página
        },
        (error) => {
          console.error("Error al actualizar la foto", error);
        }
      );
    } else {
      console.warn("No se ha seleccionado ningún archivo o no se ha encontrado el ID del producto");
    }
  }
  
  
 /* public obtenerProductoPorId(): void {
    this.ProductosService.obtenerProductoPorId(this.idProducto).subscribe(
      response => {
        this.producto = response;
        this.previewUrl = this.producto.foto;
        console.log("Producto obtenido: ", this.producto);
      }, (error) => {
        alert("Error al obtener el producto para editar");
      }
    );
  }*/

    public obtenerProductoPorId(): void {
      this.ProductosService.obtenerProductoPorId(this.idProducto).subscribe(
        response => {
          this.producto = response;
          // Asegurarse de que entregas sea un arreglo
          this.producto.entregas = Array.isArray(this.producto.entregas) ? this.producto.entregas : JSON.parse(this.producto.entregas || '[]');
          this.previewUrl = this.producto.foto;
          console.log("Producto obtenido: ", this.producto);
        },
        error => {
          alert("Error al obtener el producto para editar");
        }
      );
    }
    
  // Convertir los valores de entregas a nombres
  getEntregaNombre(entregaValue: string): string {
    const entrega = this.entregas.find(ent => ent.value === entregaValue);
    return entrega ? entrega.nombre : '';
  }
  
}