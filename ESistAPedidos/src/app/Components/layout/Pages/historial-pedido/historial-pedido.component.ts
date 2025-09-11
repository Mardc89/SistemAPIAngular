import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';

import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import *as moment from 'moment';

import { ModalDetallePedidoComponent} from '../../Modales/modal-detalle-pedido/modal-detalle-pedido.component';

import { Pedido} from '../../../../Models/Pedido';
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
  selector: 'app-historial-pedido',
  imports: [],
  templateUrl: './historial-pedido.component.html',
  styleUrl: './historial-pedido.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATA_FORMATS}
  ]
})
export class HistorialPedidoComponent implements OnInit,AfterViewInit{

  formularioBusqueda:FormGroup;
  opcionesBusqueda:any[]=[

    {ali}
    {}
  ]

}
