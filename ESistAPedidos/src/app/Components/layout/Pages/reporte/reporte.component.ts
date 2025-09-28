
import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';

import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import moment from 'moment';

import { MAT_DATE_FORMATS} from '@angular/material/core';
import* as XLSX from 'xlsx';

import { Reporte } from '../../../../Models/Reporte';
import { PedidoService } from '../../../../Services/pedido.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

import{MatMomentDateModule} from '@angular/material-moment-adapter'
import { MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule}from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';



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
  selector: 'app-reporte',
  imports: [
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatPaginator,
    CommonModule


  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
    providers:[
      {provide:MAT_DATE_FORMATS,useValue:MY_DATA_FORMATS}
    ]
})
export class ReporteComponent implements OnInit{

    formularioFiltro:FormGroup;
    listaPedidosReporte:Reporte[]=[];
    columnasTabla:string[] =['fechaRegistro','numeroPedido','total','producto','cantidad','precio','totalProducto']; 
    dataInicio:Reporte[]=[];
    dataPedidoReporte=new MatTableDataSource(this.listaPedidosReporte);
    @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

    constructor(private fb:FormBuilder,private _pedidoServicio:PedidoService,private _utilidadServicio:UtilidadService,){

      this.formularioFiltro=this.fb.group({
          fechaInicio:['',Validators.required],
          fechaFin:['',Validators.required]
      })

      
    }


  ngOnInit(): void {
    
  }

    ngAfterViewInit(): void {
    this.dataPedidoReporte.paginator=this.paginacionTabla;
  }


  buscarPedidos(){

       const _fechaInicio=moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
       const _fechaFin=moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

           if(_fechaInicio==="Invalid date"||_fechaFin==="Invalid date"){
              this._utilidadServicio.mostrarAlerta("Debe Ingresar ambas fechas","Oops!")
              return;
            }
      this._pedidoServicio.reporte(
          _fechaInicio,
          _fechaFin
      ).subscribe({

        next:(data)=>{

          if(data.status){
              this.listaPedidosReporte=data.value;
              this.dataPedidoReporte.data=data.value;

          }else{
              this.listaPedidosReporte=[];
              this.dataPedidoReporte.data=[];
              this._utilidadServicio.mostrarAlerta("No se encontraron datos","Error!");

          }
        },
        error:(e)=>{}


      })
  }

  exportarExcel(){

    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.json_to_sheet(this.listaPedidosReporte);

    XLSX.utils.book_append_sheet(wb,ws,"Reporte");
    XLSX.writeFile(wb,"Reporte Ventas.xlsx");

  }

}
