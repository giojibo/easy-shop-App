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
    this.limpia_localStorage();
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

  public limpia_localStorage():void{
    localStorage.clear();
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
      else if(link == "productos")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").addClass("active");
      }
      else if(link == "home")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").removeClass("active");
        $("#home").addClass("active");
      }

      else if(link == "adm-clientes")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").removeClass("active");
        $("home").removeClass("active")
        $("#admClientes").addClass("active");
      }
      else if(link == "adm-vendedores")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").removeClass("active");
        $("home").removeClass("active")
        $("#admClientes").removeClass("active");
        $("#admVendedores").addClass("active");
      }
      else if(link == "adm-productos")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").removeClass("active");
        $("home").removeClass("active")
        $("#admClientes").removeClass("active");
        $("#admVendedores").removeClass("active");
        $("#admProductos").addClass("active");
      }
      else if(link == "adm-administradores")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").removeClass("active");
        $("home").removeClass("active")
        $("#admClientes").removeClass("active");
        $("#admVendedores").removeClass("active");
        $("#admProductos").removeClass("active");
        $("#admAdministradores").addClass("active");
      }

  }
}
