import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { Sesion } from '../Models/Sesion';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar:MatSnackBar) { }

  mostrarAlerta(mensaje:string,tipo:string){
    this._snackBar.open(mensaje,tipo,{
      verticalPosition:"top",
      horizontalPosition:"end",
      duration:3000


    })

  }

  guardarSesionUsuario(usuarioSession:Sesion){
    localStorage.setItem("usuario",JSON.stringify(usuarioSession));

  }

  obtenerSesionUsuario(){
    const dataCadena=localStorage.getItem("usuario");
    const Usuario=JSON.parse(dataCadena!);

    return Usuario;
  }

  eliminarSesionUsuario(){

    localStorage.removeItem("usuario")

  }


}
