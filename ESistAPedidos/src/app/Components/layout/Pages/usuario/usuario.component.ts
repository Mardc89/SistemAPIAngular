import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';


import{MatPaginator} from '@angular/material/paginator';
import{MatDialog} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Models/Usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableDataSource} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-usuario',
    imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginator

    
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit,AfterViewInit{

  columnasTabla:string[]=['nombres','correo','rolDescripcion','estado','acciones'];
  dataInicio:Usuario[]=[];
  dataListaUsuarios=new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

  constructor(
    private dialog:MatDialog,
    private _usuarioServicio:UsuarioService,
    private _utilidadServicio:UtilidadService

  ){
  }

  obtenerUsuarios(){

    this._usuarioServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
          this.dataListaUsuarios.data=data.value
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Error");
      },
      error:(e)=>{}

    })

  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter=filterValue.trim().toLocaleLowerCase();

  }
  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="true")this.obtenerUsuarios();
    });
    
    
    }


    editarUsuario(usuario:Usuario){
    this.dialog.open(ModalUsuarioComponent,{
      disableClose:true,
      data:usuario
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="true")this.obtenerUsuarios();
    });
    
    
    }




eliminarUsuario(usuario: Usuario) {
  Swal.fire({
    title: '¿Desea eliminar el usuario?', 
    text: usuario.nombreCompleto,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: "Sí, eliminar",
    showCancelButton: true,
    cancelButtonColor: '#d33', 
    cancelButtonText: 'No, volver'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El Usuario fue eliminado", "Listo");
            this.obtenerUsuarios();
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo eliminar el usuario", "Error");
          }
        },
        error: (e) => {
          console.error("Error al eliminar usuario:", e);
          this._utilidadServicio.mostrarAlerta("Error del servidor al eliminar el usuario", "Error");
        }
      });




    }
  });
}


}
