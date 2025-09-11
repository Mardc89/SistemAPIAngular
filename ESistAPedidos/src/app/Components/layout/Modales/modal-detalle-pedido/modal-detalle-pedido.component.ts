import { Component,OnInit,Inject } from '@angular/core';
import{MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pedido } from '../../../../Models/Pedido';
import { DetallePedido } from '../../../../Models/DetallePedido';
import { MatGridList } from "@angular/material/grid-list";
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-detalle-pedido',
  imports: [
    MatGridList,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrl: './modal-detalle-pedido.component.css'
})
export class ModalDetallePedidoComponent implements OnInit {
  fechaRegistro:string="";
  numeroDocumento:string="";
  total:string="";
  detallePedido:DetallePedido[]=[];
  columnasTabla:string[]=['producto','cantidad','precio','total']



  constructor(@Inject(MAT_DIALOG_DATA)public _pedido:Pedido ){
    this.fechaRegistro=_pedido.fechaPedido!;
    this.numeroDocumento=_pedido.numeroDocumento!;
    this.total=_pedido.totalTexto;
    this.detallePedido=_pedido.detallePedido;

  }

  ngOnInit(): void {
    
  }

}
