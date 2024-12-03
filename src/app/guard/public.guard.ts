import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { FacadeService } from '../services/facade.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class publicGuard{
  
  constructor(
    private router: Router,
    private authServices: FacadeService, 
  ){}
  private checkLogin(): boolean
  {
    const token = this.authServices.getSessionToken();
    console.log("Esta autenticado, su clave de acceso es: ", token);

    if(token)
    {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

  public canActivate: CanActivateFn = (route, state)=>{
    return this.checkLogin()
  };

  public canMath: CanMatchFn = (route, segments)=>{
    return this.checkLogin()
  };
};
