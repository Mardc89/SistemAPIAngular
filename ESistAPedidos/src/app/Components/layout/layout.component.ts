import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { UtilidadService } from '../../Reutilizable/utilidad.service';
import{Router} from '@angular/router';
import { Menu } from '../../Models/menu';
import { MenuService } from '../../Services/menu.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent implements OnInit{

  listaMenus:Menu[]=[];
  correoUsuario:string="";
  rolUsuario:string="";

constructor(private router:Router,private _menuServicio:MenuService,private _utilidadService:UtilidadService){


  }


  ngOnInit(): void {

    const usuario=this._utilidadService.obtenerSesionUsuario();

    if(usuario!=null){
      this.correoUsuario=usuario.correo;
      this.rolUsuario=usuario.rolDescripcion;


      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next:(data)=>{
          if(data.status)this.listaMenus=data.value

        },
        error:(e)=>{}

      })



    }
    
  }

  cerrarSesion(){

    this._utilidadService.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

}







