import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';

declare var $:any;


@Component({
  selector: 'app-registrar-admin',
  templateUrl: './registrar-admin.component.html',
  styleUrls: ['./registrar-admin.component.scss']
})
export class RegistrarAdminComponent implements OnInit{

@Input() rol: string = "";
@Input() datos_user: any = {};

//Para contraseñas
public hide_1: boolean = false;
public hide_2: boolean = false;
public inputType_1: string = 'password';
public inputType_2: string = 'password';

public admin:any= {};
public token: string = "";
public errors:any={};
public editar:boolean = false;
public idUser: Number = 0;

constructor(
  private location : Location,
  private router: Router,
  public activatedRoute: ActivatedRoute,
  private administradoresService: AdministradoresService,
  private facadeService: FacadeService,
  
){}

ngOnInit(): void {
  //El primer if valida si existe un parámetro en la URL
  if(this.activatedRoute.snapshot.params['id'] != undefined){
    this.editar = true;
    //Asignamos a nuestra variable global el valor del ID que viene por la URL
    this.idUser = this.activatedRoute.snapshot.params['id'];
    console.log("ID User: ", this.idUser);
    //Al iniciar la vista asignamos los datos del user
    this.admin = this.datos_user;
  }else{
    //this.admin = this.administradoresService.esquemaAdmin();
    this.admin.rol = this.rol;
    this.token = this.facadeService.getSessionToken();
  }
  //Imprimir datos en consola
  console.log("Admin: ", this.admin);

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar)
   
      const email = this.admin.email || ''; 

      if(!email.endsWith('@alumno.buap.mx'))
      {
        this.errors['email'] = 'El correo debe ser de dominio @alumno.buap.mx'
        alert(this.errors['email']);
        return; 
      }
      
    // Validamos que las contraseñas coincidan
    // Validar la contraseña
    if(this.admin.password == this.admin.confirmar_password){
      //Si todo es correcto vamos a registrar - se manda a consumir el servicio
      this.administradoresService.registrarAdmin(this.admin).subscribe(
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
      this.admin.password="";
      this.admin.confirmar_password="";
    }
  }
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
}