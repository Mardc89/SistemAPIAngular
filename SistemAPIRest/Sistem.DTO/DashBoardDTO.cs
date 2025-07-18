using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DTO
{
    public class DashBoardDTO
    {
        public int TotalPedidos { get; set; }
        public string? ToTalIngresos { get; set; }

        public List<PedidosSemanaDTO> PedidosUltimaSemana { get; set; }
    }
}
