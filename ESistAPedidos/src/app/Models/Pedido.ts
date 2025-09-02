

import { DetallePedido } from "./DetallePedido"


export interface Pedido {
    idPedido?:number,
    numeroDocumento?:string,
    fechaPedido?:string,
    totalTexto:string,
    detallePedido:DetallePedido[]
}