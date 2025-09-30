import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import{Chart,registerables} from 'chart.js';
import { DashBoardService} from '../../../../Services/dash-board.service';
Chart.register(...registerables);


import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dash-board',
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule
],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{


  totalIngresos:string="0";
  totalPedidos:string="0"; 
  totalProductos:string="0";
  constructor(private _dashboardServicio:DashBoardService){
 


  }


  mostrarGrafico(labelGrafico:any[],dataGrafico:any[]){

    const chartBarras=new Chart('chartBarras',{
      type:'bar',
      data:{
        labels:labelGrafico,
        datasets:[{
          label:"# de Pedidos",
          data:dataGrafico,
          backgroundColor:[
            'rgba(54,162,235,0.2)'
          ],
          borderColor:[
            'rgba(54,162,235,1)'
          ],
          borderWidth:1
        }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    
    });

  }

  ngOnInit(): void {


    this._dashboardServicio.resumen().subscribe({
          next:(data)=>{

            if(data.status){
                this.totalIngresos=data.value.totalIngresos;
                this.totalPedidos=data.value.totalPedidos;
                this.totalProductos=data.value.totalProductos;

                const arrayData:any[]=data.value.pedidosUltimaSemana;
                console.log(arrayData);
                const labelTemp=arrayData.map((value)=>value.fecha);
                const dataTemp=arrayData.map((value)=>value.total);
                console.log(labelTemp,dataTemp);
                this.mostrarGrafico(labelTemp,dataTemp);

            }


          },
          error:(e)=>{}




    })
    
  }

}
