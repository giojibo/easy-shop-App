import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';

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

  public clientes:any={};
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public token: string = "";
  public  selectedFile: any;
  public previewUrl: any;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private location : Location,
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
    }else{
      this.clientes = this.clientesService.esquemaCliente();
      this.clientes.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Alumno: ", this.clientes);
  }
  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.clientesService.validarCliente(this.clientes, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return;
    }

    if(this.clientes.password == this.clientes.confirmar_password){
      //Si todo es correcto vamos a registrar - se manda a consumir el servicio
      this.clientesService.registrarCliente(this.clientes).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error)=>{
            alert("No se pudo registrar el usuario");
        }
      );
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
}
