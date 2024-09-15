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
    this.token = this.facadeService.getSessionToken();
    this.rol = this.facadeService.getUserGroup();
  }

  public goRegistro_Vendedor()
  {
    this.router.navigate(["registro-vendedor"]);
  }
  public goRegistro_Cliente()
  {
    this.router.navigate(["registro-cliente"]);
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
      else if(link == "materias")
        {
        $("#cliente").removeClass("active");
        $("#vendedor").removeClass("active");
        $("#principal").removeClass("active");
        $("#productos").addClass("active");
      }

  }
}
