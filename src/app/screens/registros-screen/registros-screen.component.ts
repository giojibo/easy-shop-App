import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';

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


  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private clientesServices: ClientesService
  )
  {}

  ngOnInit(): void {
    //Obtener de la URL el rol para saber cual editar
    if(this.activatedRoute.snapshot.params['rol'] != undefined){
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol detect: ", this.rol);
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
