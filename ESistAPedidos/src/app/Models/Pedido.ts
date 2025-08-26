

import { DetallePedido } from "./DetallePedido"


export interface Pedido {
    idPedido?:number,
    codigo:string,
    fechaPedido?:string,
    montoTotal:string,
    detallePedido:DetallePedido[]
}