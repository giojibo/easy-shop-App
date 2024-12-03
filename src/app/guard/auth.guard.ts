import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { FacadeService } from '../services/facade.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard{
  

  constructor(
    private authServices: FacadeService,
    private router: Router,
  ){}

  

  private checkAutenticacion(): boolean
  {
    const autenticación = this.authServices.getSessionToken();
    console.log("Esta autenticado, su clave de acceso es: ", autenticación);

    if(!autenticación)
    {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  public canActivate: CanActivateFn = (route, state)=>{
    return this.checkAutenticacion()
  };

  public canMath: CanMatchFn = (route, segments)=>{
    return this.checkAutenticacion()
  };
};
