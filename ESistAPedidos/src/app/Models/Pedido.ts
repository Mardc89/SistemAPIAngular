

import { DetallePedido } from "./DetallePedido"


export interface Pedido {
    idPedido?:number,
    numerodocumento?:string,
    fechaRegistro?:string,
    totalTexto:string,
    detallePedidos:DetallePedido[]
}