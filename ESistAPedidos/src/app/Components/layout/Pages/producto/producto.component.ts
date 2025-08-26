import {AfterViewInit, Component, OnInit,ViewChild} from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';
import{MatPaginator} from '@angular/material/paginator';
import{MatDialog} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from '../../../../Models/Producto';
import { ProductoService } from '../../../../Services/producto.service';
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

import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-producto',
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
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit,AfterViewInit{

  columnasTabla:string[]=['nombre','categoria','stock','precio','estado','acciones'];
  dataInicio:Producto[]=[];
  dataListaProductos=new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

    constructor(
      private dialog:MatDialog,
      private _productoServicio:ProductoService,
      private _utilidadServicio:UtilidadService
  
    ){
    }

    obtenerProductos(){

    this._productoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)
          this.dataListaProductos.data=data.value
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos","Error");
      },
      error:(e)=>{}

    })
  }
  

  ngOnInit(): void {
    this.obtenerProductos();
  }

    ngAfterViewInit(): void {
    this.dataListaProductos.paginator=this.paginacionTabla;
  }

    aplicarFiltroTabla(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataListaProductos.filter=filterValue.trim().toLocaleLowerCase();

  }

    nuevoProducto(){
      this.dialog.open(ModalProductoComponent,{
        disableClose:true
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="true")this.obtenerProductos();
      });
      
      
      }
  
  
      editarProducto(producto:Producto){
      this.dialog.open(ModalProductoComponent,{
        disableClose:true,
        data:producto
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="true")this.obtenerProductos();
      });
      
      
      }
  
  
  
  
  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?', 
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33', 
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoServicio.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El Usuario fue eliminado", "Listo");
              this.obtenerProductos();
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
