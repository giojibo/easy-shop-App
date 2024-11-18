import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-registros-screen',
  templateUrl: './registros-screen.component.html',
  styleUrls: ['./registros-screen.component.scss']
})
export class RegistrosScreenComponent implements OnInit {

  public tipo:string = "registros";
  //JSON para los usuarios (admin, maestros, alumnos)
  public user:any ={};

  public isUpdate:boolean = false;
  public errors:any = {};
  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;
  public isCliente:boolean = false;
  public isVendedor:boolean = false;
  public editar: boolean = false;
  public tipo_user:string = "";
  //Info del usuario
  public idUser: Number = 0;
  public rol: string = "";
  public token : string = "";


  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private clientesServices: ClientesService,
    private admnistradoresServices: AdministradoresService,
    private vendedoresServices: VendedoresService
  )
  {}

  ngOnInit(): void {

    //this.rol = this.facadeService.getUserGroup(); 
    console.log("Rol user: ", this.rol); 
    this.token = this.facadeService.getSessionToken(); 


    this.idUser = Number(this.facadeService.getUserIdFromLocalStorage());
    
    //Obtener de la URL el rol para saber cual editar
    if(this.activatedRoute.snapshot.params['rol'] !== undefined){
      this.rol = this.activatedRoute.snapshot.params['rol'];
      this.editar = this.activatedRoute.snapshot.params['id'] !== undefined; 

      if(!this.editar){
        this.user = {};
      }
      console.log("Rol detect: ", this.rol);
    }
    
      console.log("Id obtenido desde el localstorage: ", this.idUser)
      this.obtenerUserByID();
    }

    
  public obtenerUserByID(){
    if(this.rol == "administrador"){
      this.admnistradoresServices.getAdminByID(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAdmin = true;
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }else if(this.rol == "vendedor"){
      this.vendedoresServices.obtenerVendedorPorId(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isVendedor = true;
          console.log("Datos vendedor: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }else if(this.rol == "cliente"){
      this.clientesServices.obtenerClienterPorId(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isCliente = true;
          console.log("Datos cliente: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
  }
}

  public radioChange(event: MatRadioChange) {

    if(event.value == "administrador"){
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isCliente = false;
      this.isVendedor = false;
    }else if (event.value == "cliente"){
      this.isAdmin = false;
      this.isCliente = true;
      this.tipo_user = "cliente"
      this.isVendedor = false;
    }else if (event.value == "vendedor"){
      this.isAdmin = false;
      this.isCliente = false;
      this.isVendedor = true;
      this.tipo_user = "vendedor"
    }
  }
}
