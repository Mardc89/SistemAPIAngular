import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Login } from '../../Models/Login';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{

  formularioLogin:FormGroup;
  ocultarPassword:boolean=true ;
  mostrarLoading:boolean=true;

  
  constructor(
  private fb:FormBuilder,
  private router:Router,
  private _usuarioServicio:UsuarioService ,
  private _utilidadServicio:UtilidadService
  ) 
  {
    this.formularioLogin=this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }


  ngOnInit(): void {
    
  }

  IniciarSesion(){

    this.mostrarLoading=true;

    const request:Login={

      correo:this.formularioLogin.value.email,
      clave:this.formularioLogin.value.password
    }

    this._usuarioServicio.iniciarSesion(request).subscribe({
      next:(data)=>{

        if(data.status){
          this._utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"])

        }else{
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Error")
        }

      },
      complete:()=>{
        this.mostrarLoading=false;

      },

      error :()=>{

        this._utilidadServicio.mostrarAlerta("Error","atento")
      }

    })

  }

}
