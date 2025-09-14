import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

import { ModalDetallePedidoComponent} from '../../Modales/modal-detalle-pedido/modal-detalle-pedido.component';

import { Pedido} from '../../../../Models/Pedido';
import { PedidoService } from '../../../../Services/pedido.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule}from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';




export const MY_DATA_FORMATS={
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMMM YYYY'
  }


}

@Component({
  selector: 'app-historial-pedido',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatButton,
    MatIcon,
    MatTableModule,
    MatPaginator,
    MatDividerModule
],
  templateUrl: './historial-pedido.component.html',
  styleUrl: './historial-pedido.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATA_FORMATS}
  ]
})
export class HistorialPedidoComponent implements OnInit,AfterViewInit{

  formularioBusqueda:FormGroup;
  opcionesBusqueda:any[]=[

    {value:"fecha",descripcion:"por fechas"},
    {value:"numero",descripcion:"Numero pedido"}
  ]
columnasTabla:string[] =['fechaRegistro','numeroDocumento','total','accion'] 
dataInicio:Pedido[]=[];
datosListaPedido=new MatTableDataSource(this.dataInicio);
@ViewChild(MatPaginator)paginacionTabla!:MatPaginator;


constructor(
  private fb:FormBuilder,
  private _pedidoServicio:PedidoService,
  private dialog:MatDialog,  
  private _utilidadServicio:UtilidadService,

){

this.formularioBusqueda=this.fb.group(
  {
    buscarPor:['fecha'],
    numero:[''],
    fechaInicio:[''],
    fechaFin:['']
  })

  this.formularioBusqueda.get('buscarPor')?.valueChanges.subscribe(value=>{
    this.formularioBusqueda.patchValue({
      numero:"",
      fechaInicio:"",
      fechaFin:""
    })
  })

}


ngOnInit(): void {
  
}

  ngAfterViewInit(): void {
    this.datosListaPedido.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.datosListaPedido.filter=filterValue.trim().toLocaleLowerCase();

  }

  buscarPedidos(){
  let _fechaInicio:string="";
  let _fechaFin:string="";

  if(this.formularioBusqueda.value.buscaPor==="fecha"){
    _fechaInicio=moment(this.formularioBusqueda.value.fechaInicio).format('DD/MM/YYYY');
    _fechaFin=moment(this.formularioBusqueda.value.fechaFin).format('DD/MM/YYYY');

    if(_fechaInicio==="Invalid date"||_fechaFin==="Invalid date"){
      this._utilidadServicio.mostrarAlerta("Debe Ingresar ambas fechas","Oops!")
      return;
    }
  }

  this._pedidoServicio.historial(
    this.formularioBusqueda.value.buscaPor,
    this.formularioBusqueda.value.numero,
    _fechaInicio,
    _fechaFin

  ).subscribe({

    next:(data)=>{
      if(data.status)
        this.datosListaPedido=data.value;
      else
        this._utilidadServicio.mostrarAlerta("No se encontraron datos","error");

    },
    error:(e)=>{}

  })
  }

  verDetallePedido(_pedido:Pedido){

    this.dialog.open(ModalDetallePedidoComponent,{
      data:_pedido,
      disableClose:true,
      width:'700px'
    })




  }



}
