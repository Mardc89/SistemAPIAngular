import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../Models/Producto';
import { DetallePedido } from '../../../../Models/DetallePedido';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../../../Services/producto.service';
import { PedidoService } from '../../../../Services/pedido.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { Pedido } from '../../../../Models/Pedido';

@Component({
  selector: 'app-pedido',
  imports: [],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit{

  listaProductos:Producto[]=[];
  listaProductosFiltro:Producto[]=[];

  listaProductosParaPedido:DetallePedido[]=[];
  bloquearBotonRegistrar:boolean=false;

  productoSeleccionado!:Producto;
  totalPagar:number=0;

  formularioProductoPedido:FormGroup;
  columnasTabla:string[]=['producto','cantidad','precio','total','accion'];
  datosDetallePedido=new MatTableDataSource(this.listaProductosParaPedido);

  retornarProductoPorFiltro(busqueda:any):Producto[]{

    const valorBuscado=typeof busqueda==="string"?busqueda.toLocaleLowerCase():busqueda.nombre.toLocaleLowerCase();

    return this.listaProductos.filter(item=>item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }


  constructor(

    private fb:FormBuilder,
    private _productoServicio:ProductoService,
    private _pedidoServicio:PedidoService,
    private _utilidadServicio:UtilidadService
  )
  {

    this.formularioProductoPedido=this.fb.group({

    producto:['', Validators.required],
    cantidad:['', Validators.required]
});

    this._productoServicio.lista().subscribe({
      next:(data)=>{
        if(data.status){
          const lista=data.value as Producto[];
          this.listaProductos=lista.filter(p=>p.esActivo==1 && p.stock>0);
        }
      },
      error:(e)=>{}
    })

    this.formularioProductoPedido.get('producto')?.valueChanges.subscribe(value=>{
    this.listaProductosFiltro=this.retornarProductoPorFiltro(value);

    })


  }

  ngOnInit(): void {
    
  }


  mostrarProducto(producto:Producto):string{

    return producto.nombre;
  }

  productoParaPedido(event:any){
    this.productoSeleccionado=event.option.value;

  }


  agregarProductoParaPedido(){

    const _cantidad:number=this.formularioProductoPedido.value.cantidad;
    const _precio:number=parseFloat(this.productoSeleccionado.precio);
    const _total:number=_cantidad*_precio;

    this.totalPagar=this.totalPagar+_total;

    this.listaProductosParaPedido.push({
      idProducto:this.productoSeleccionado.idProducto,
      descripcionProducto:this.productoSeleccionado.nombre,
      cantidad:_cantidad,
      precioTexto:String(_precio.toFixed(2)),
      totalTexto:String(_precio.toFixed(2))
    })

    this.datosDetallePedido=new MatTableDataSource(this.listaProductosParaPedido);

    this.formularioProductoPedido.patchValue({
         producto:'',
         cantidad:''

    })


  }

  eliminarProducto(detalle:DetallePedido){
    this.totalPagar=this.totalPagar-parseFloat(detalle.totalTexto),
    this.listaProductosParaPedido=this.listaProductosParaPedido.filter(p=>p.idProducto!=detalle.idProducto);

    this.datosDetallePedido=new MatTableDataSource(this.listaProductosParaPedido);


  }

  registrarPedido(){

    if(this.listaProductosParaPedido.length>0){

      this.bloquearBotonRegistrar=true;

      const request:Pedido={
        totalTexto:String(this.totalPagar.toFixed(2)),
        detallePedido:this.listaProductosParaPedido
      }


    }

  }

}
