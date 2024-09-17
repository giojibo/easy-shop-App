import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

constructor(
  private router: Router,
){}

  ngOnInit(): void {
    
  }

  public registrar(){
    this.router.navigate(["registros"]);
  }

}
