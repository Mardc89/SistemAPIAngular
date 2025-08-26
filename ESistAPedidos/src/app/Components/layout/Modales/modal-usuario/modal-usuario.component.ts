import { Component,OnInit,Inject } from '@angular/core';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Rol } from '../../../../Models/Rol';
import { Usuario } from '../../../../Models/Usuario';


import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-usuario',
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion :string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];


  constructor(

  private modalActual:MatDialogRef<ModalUsuarioComponent>,
  @Inject(MAT_DIALOG_DATA) public datosUsuario:Usuario,
  private fb:FormBuilder,
  private _rolServicio:RolService,
  private _usuarioServicio:UsuarioService,
  private _utilidadServicio:UtilidadService
  ){

    this.formularioUsuario=this.fb.group({

      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      correo:['',Validators.required],
      idRol:['',Validators.required],
      clave:['',Validators.required],
      estado:['1',Validators.required],
      dni:['',Validators.required],
      nombreUsuario:['',Validators.required]
      
    });

    if(this.datosUsuario!=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._rolServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)this.listaRoles=data.value
      },
      error:(e)=>{}

    })

  }

  
  ngOnInit(): void {
    
    if(this.datosUsuario!=null){

      this.formularioUsuario.patchValue({
        nombres:this.datosUsuario.nombres,
        apellidos:this.datosUsuario.apellidos,
        correo:this.datosUsuario.correo,
        idRol:this.datosUsuario.idRol,
        clave:this.datosUsuario.clave,
        estado:this.datosUsuario.estado.toString(),
        dni:this.datosUsuario.dni,
        nombreUsuario:this.datosUsuario.nombreUsuario
       


      })

    }


  }

  guardarEditar_Usuario(){

    const _usuario:Usuario={
      idUsuario:this.datosUsuario==null?0:this.datosUsuario.idUsuario,
      dni:this.formularioUsuario.value.dni,
      nombreUsuario:this.formularioUsuario.value.nombreUsuario,
      nombres:this.formularioUsuario.value.nombres,
      apellidos:this.formularioUsuario.value.apellidos,
      correo:this.formularioUsuario.value.correo,
      idRol:this.formularioUsuario.value.idRol,
      rolDescripcion:"",
      clave:this.formularioUsuario.value.clave,
      estado:parseInt(this.formularioUsuario.value.estado),
      fechaRegistro:this.datosUsuario?.fechaRegistro??new Date()
    }

    if(this.datosUsuario==null){

      this._usuarioServicio.guardar(_usuario).subscribe({
        next:(data)=>{

          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el Usuario","Error");
        },
        error:(e)=>{}
      })
    }

    else{
      this._usuarioServicio.editar(_usuario).subscribe({
        next:(data)=>{

          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue editado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el Usuario","Error");
        },
        error:(e)=>{}
      })




    }

  }

}
