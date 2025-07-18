using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DTO
{
    public class PedidoDTO
    {
        public int IdPedido { get; set; }

        public string? Numerodocumento { get; set; }

        public string? TotalTexto { get; set; }

        public string? FechaRegistro { get; set; }

        public virtual ICollection<DetallePedidoDTO> DetallePedido { get;set; }
    }
}
