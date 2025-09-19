
import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';

import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import moment from 'moment';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import*as XLSX from "xlsx";

import { Reporte } from '../../../../Models/Reporte';
import { PedidoService } from '../../../../Services/pedido.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';



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
  imports: [],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
    providers:[
      {provide:MAT_DATE_FORMATS,useValue:MY_DATA_FORMATS}
    ]
})
export class ReporteComponent implements OnInit{

    formularioFiltro:FormGroup;
    listaPedidosReporte:Reporte[]=[];
    columnasTabla:string[] =['fechaRegistro','numeroPedido','total','producto','cantidad','precio','TotalProducto']; 
    dataInicio:Reporte[]=[];
    dataPedidoReporte=new MatTableDataSource(this.listaPedidosReporte);
    @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

    constructor(private fb:FormBuilder,private _pedidoServicio:PedidoService,private _utilidadServicio:UtilidadService,){

      
    }


  ngOnInit(): void {
    
  }

}
