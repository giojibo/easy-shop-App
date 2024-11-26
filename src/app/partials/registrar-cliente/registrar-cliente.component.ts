import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserComponent } from 'src/app/modals/editar-user/editar-user.component';

declare var $:any;

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss']
})
export class RegistrarClienteComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public clientes:any= {}; //this.clientesService.esquemaCliente()
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public token: string = "";
  public  selectedFile: any;
  public previewUrl: string = 'assets/images/no-image.png';
  //public selectedFile: File | null = null;
  //public previewUrl: string | ArrayBuffer | null = this.clientes.foto ? this.clientes.foto : 'assets/images/no-image.png';

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private location : Location,
    public dialog: MatDialog,
  ){

  }
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.clientes = this.datos_user;

      if(this.clientes.foto){
        this.previewUrl= this.clientes.foto;
      }
    }else{
      this.clientes = this.clientesService.esquemaCliente();
      this.clientes.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Cliente: ", this.clientes);
  }
  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.clientesService.validarCliente(this.clientes, this.editar);
    
    const email = this.clientes.email || ''; 

      if(!email.endsWith('@alumno.buap.mx'))
      {
        this.errors['email'] = 'El correo debe ser de dominio @alumno.buap.mx'
        alert(this.errors['email']);
        return; 
      }

    if(this.clientes.password == this.clientes.confirmar_password)
    {
      // Si hay una imagen seleccionada, agregarla al FormData
      if (!this.selectedFile) 
      {
        this.clientes.foto = 'assets/images/no-image.png';
      }
      else{

        //Si todo es correcto vamos a registrar - se manda a consumir el servicio
      const formData = new FormData();

      // Agregar los datos del cliente al FormData
      formData.append('first_name', this.clientes.first_name);
      formData.append('last_name', this.clientes.last_name);
      formData.append('email', this.clientes.email);
      formData.append('edad', this.clientes.edad);
      formData.append('password', this.clientes.password);
      formData.append('rol', this.clientes.rol);
      formData.append('foto', this.selectedFile);

        // Enviar los datos al servicio para registrar el cliente
        this.clientesService.registrarCliente(formData).subscribe(
          (response) => {
            alert('Usuario registrado correctamente');
            console.log('Usuario registrado:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            alert('No se pudo registrar el usuario');
          }
        );
      }
    }
    else{
      alert("Las contraseñas no coinciden");
      this.clientes.password="";
      this.clientes.confirmar_password="";
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
  this.errors = this.clientesService.validarCliente(this.clientes, this.editar);

  if (!$.isEmptyObject(this.errors)) {
    return;
  }
  console.log("Pasó la validación");

  const dialogRef = this.dialog.open(EditarUserComponent,{
    data: { id: this.clientes, rol: 'cliente' }, // Pasar valores al componente modal
    height: '288px',
    width: '328px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.isEdit) {
      console.log("Cliente editado");
      // Recargar página o redirigir al home
      this.router.navigate(["home"]);
    } else {
      alert("Cliente no editado ");
      console.log("No se editó el cliente");
    }
  });
}
public actualizarFoto(): void {
  if (this.selectedFile && this.clientes.id) {
    const data = {
      id: this.clientes.id,
      first_name: this.clientes.first_name,
      last_name: this.clientes.last_name,
      telefono: this.clientes.telefono,
      edad: this.clientes.edad
    };
    
    this.clientesService.editarCliente(data, this.selectedFile).subscribe(
      (response) => {
        console.log("Foto actualizada exitosamente: ", response);
       this.clientes = response;// Refrescar los datos para mostrar la imagen actualizada
       window.location.reload();
      },
      (error) => {
        console.error("Error al actualizar la foto", error);
      }
    );
  } else {
    console.warn("No se ha seleccionado ningún archivo o no se ha encontrado el ID del cliente");
  }
}
}