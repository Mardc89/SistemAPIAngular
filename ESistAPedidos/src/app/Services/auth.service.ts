
import {Injectable } from '@angular/core';

import {CanActivate,Router} from '@angular/router';
import { UtilidadService } from '../Reutilizable/utilidad.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private router:Router,private utilidadService:UtilidadService ) { }

  canActivate():boolean {
    const usuario=this.utilidadService.obtenerSesionUsuario();


    if(usuario){
        return true;
    }
    else{

        this.router.navigate(['/login'],{replaceUrl:true});

        return false;
    }
      
  }


}