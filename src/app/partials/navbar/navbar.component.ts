import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() tipo:string = "";
  @Input() rol:string = "";

  public token : string = "";
  public editar:boolean = false;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ){
  }

  ngOnInit(): void 
  {
    this.rol = this.facadeService.getUserGroup();
      console.log("Rol user: ", this.rol);
      //Validar que haya inicio de sesión
      //Obtengo el token del login
      this.token = this.facadeService.getSessionToken();
      //El primer if valida si existe un parámetro en la URL
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        this.editar = true;
    }
  }

  public registros()
  {
    this.router.navigate(["registros"])
  }


  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        console.log("Entró");
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate([""]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

  public clickNavLink(link: string)
  {
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100); 
  }

  public activarLink(link: string)
  {
    if(link == "clientes")
    {
      $("#principal").removeClass("active");
      $("#vendedor").removeClass("active");
      $("#cliente").addClass("active");
    }
    else if(link == "vendedores")
    {
      $("#principal").removeClass("active");
      $("#cliente").removeClass("active");
      $("#vendedor").addClass("active");
    }
    else if(link == "home")
      {
        $("#vendedor").removeClass("active");
        $("#cliente").removeClass("active");
        $("#principal").addClass("active");
      }
      else if(link == "productos")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").addClass("active");
      }

  }
}
