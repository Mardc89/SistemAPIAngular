using MapsterMapper;
using Sistem.BLL.Interfaces;
using Sistem.DAL.Interfaces;
using Sistem.DTO;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.BLL.Implementacion
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _pedidoRepositorio;
        private readonly IGenericRepository<DetallePedido> _detallePedidoRepositorio;
        private readonly IMapper _mapper;
        public PedidoService(IPedidoRepository pedidoRepositorio,IGenericRepository<DetallePedido> detallePedidoRepositorio, IMapper mapper)
        {
           _pedidoRepositorio = pedidoRepositorio;
           _detallePedidoRepositorio = detallePedidoRepositorio;
           _mapper = mapper;
        }

        public async Task<PedidoDTO> Registrar(PedidoDTO modelo)
        {
            try
            {
                var PedidoGenerado = await _pedidoRepositorio.Registrar(_mapper.Map<Pedido>(modelo));
                if (PedidoGenerado.IdPedido == 0)
                    throw new TaskCanceledException("El usuario no existe");

                return _mapper.Map<PedidoDTO>(PedidoGenerado);
            }
            catch 
            {

                throw;
            }


        }

        public Task<List<PedidoDTO>> Historial(string buscarPor, string numeroPedido, string fechaInicio, string fechaFin)
        {
            throw new NotImplementedException();
        }



        public Task<List<ReporteDTO>> Reporte(string fechaInicio, string fechaFin)
        {
            throw new NotImplementedException();
        }
    }
}
