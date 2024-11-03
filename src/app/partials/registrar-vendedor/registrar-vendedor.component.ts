import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FacadeService } from 'src/app/services/facade.service';
import { VendedoresService } from '../../services/vendedores.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserComponent } from 'src/app/modals/editar-user/editar-user.component';

declare var $:any;

@Component({
  selector: 'app-registrar-vendedor',
  templateUrl: './registrar-vendedor.component.html',
  styleUrls: ['./registrar-vendedor.component.scss']
})
export class RegistrarVendedorComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public vendedor:any={};
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public token: string = "";
  public  selectedFile: any;
  public previewUrl: string = 'assets/images/no-image.png';

  constructor(
    private vendedoresService: VendedoresService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private location : Location,
    public dialog: MatDialog,
  ){

  }
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      this.vendedor = this.datos_user;
  
      // Si existe una URL de foto en el vendedor, úsala para la previsualización
      if (this.vendedor.foto) {
        this.previewUrl = this.vendedor.foto;
      }
    } else {
      this.vendedor = this.vendedoresService.esquemaVendedor();
      this.vendedor.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    console.log("Vendedor: ", this.vendedor);
  }
  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.vendedoresService.validarVendedor(this.vendedor, this.editar);
    
    const email = this.vendedor.email || ''; 

      if(!email.endsWith('@alumno.buap.mx'))
      {
        this.errors['email'] = 'El correo debe ser de dominio @alumno.buap.mx'
        alert(this.errors['email']);
        return; 
      }

    if(this.vendedor.password == this.vendedor.confirmar_password)
    {
      if(!this.selectedFile)
      {
        this.vendedor.foto = 'assets/images/no-image.png';
      }
    else{
      
      const formData = new FormData(); 
      formData.append('first_name', this.vendedor.first_name);
      formData.append('last_name', this.vendedor.last_name);
      formData.append('email', this.vendedor.email);
      formData.append('edad', this.vendedor.edad);
      formData.append('telefono', this.vendedor.telefono);
      formData.append('password', this.vendedor.password);
      formData.append('rol', this.vendedor.rol);
      formData.append('foto', this.selectedFile);

        this.vendedoresService.registrarVendedor(formData).subscribe(
          (response)=>{
            alert('Usuario registrado correctamente');
            console.log("Usuario registrado: ", response);
            this.router.navigate(['/']);
          },
          (error) =>{
            alert('No se pudo registar el usuario'); 
          }
        );
    }
  }else{

      alert("Las contraseñas no coinciden");
      this.vendedor.password="";
      this.vendedor.confirmar_password="";
    }
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
  // Método para manejar el evento 'change' del input de tipo file
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Mostrar la previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  insertPhoto(){
    document.getElementById('file-input')?.click();
  }

  public actualizar() {
    this.errors = []; 
    this.errors = this.vendedoresService.validarVendedor(this.vendedor, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      return;
    }
    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarUserComponent,{
      data: { id: this.vendedor, rol: 'vendedor' }, // Pasar valores al componente modal
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isEdit) {
        console.log("Vendedor editado");
        // Recargar página o redirigir al home
        this.router.navigate(["home"]);
      } else {
        alert("Vendedor no editado ");
        console.log("No se editó el maestro");
      }
    });
  }
  public actualizarFoto(): void {
    if (this.selectedFile && this.vendedor.id) {
      const data = {
        id: this.vendedor.id,
        first_name: this.vendedor.first_name,
        last_name: this.vendedor.last_name,
        telefono: this.vendedor.telefono,
        edad: this.vendedor.edad
      };
      
      this.vendedoresService.editarVendedor(data, this.selectedFile).subscribe(
        (response) => {
          console.log("Foto actualizada exitosamente: ", response);
         this.vendedor = response;// Refrescar los datos para mostrar la imagen actualizada
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