using Sistem.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.BLL.Interfaces
{
    public interface IPedidoService
    {
        Task<PedidoDTO> Registrar(PedidoDTO modelo);
        Task<List<PedidoDTO>> Historial(string buscarPor,string numeroPedido,string fechaInicio,string fechaFin);
        Task<List<ReporteDTO>> Reporte(string fechaInicio,string fechaFin);
    }
}
