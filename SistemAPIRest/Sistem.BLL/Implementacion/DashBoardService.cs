using MapsterMapper;
using Sistem.BLL.Interfaces;
using Sistem.DAL.Interfaces;
using Sistem.DTO;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.BLL.Implementacion
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IGenericRepository<Producto> _productoRepositorio;
        private IMapper _mapper;
        public DashBoardService(IPedidoRepository pedidoRepository, IGenericRepository<Producto> productoRepositorio, IMapper mapper)
        {
            _pedidoRepository = pedidoRepository;
            _productoRepositorio = productoRepositorio;
            _mapper = mapper;
        
                
        }
        public Task<DashBoardDTO> Resumen()
        {
            throw new NotImplementedException();
        }

        private IQueryable<Pedido> _retornarPedidos(IQueryable<Pedido> tablaPedido,int restarCantidadDias){
            DateTime? ultimaFecha = tablaPedido.OrderByDescending(c => c.FechaRegistro).Select(n=>n.FechaRegistro).First();
            ultimaFecha = ultimaFecha.Value.AddDays(restarCantidadDias);

            return tablaPedido.Where(s => s.FechaRegistro.Value.Date >= ultimaFecha.Value.Date);
        }

        private async Task<int> TotalPedidosUltimaSemana(){
            int total = 0;
            IQueryable<Pedido> _pedidoQuery = await _pedidoRepository.Consultar();

            if (_pedidoQuery.Count()>0){
                var tablaPedido = _retornarPedidos(_pedidoQuery, -7);
                total = tablaPedido.Count();

            }

            return total;

        }

        private async Task<string> TotalIngresosUltimaSemana()
        {
            decimal resultado = 0;
            IQueryable<Pedido> _pedidoQuery = await _pedidoRepository.Consultar();

            if (_pedidoQuery.Count() > 0)
            {
                var tablaPedido = _retornarPedidos(_pedidoQuery, -7);

                resultado = tablaPedido.Select(s => s.Total).Sum(n=>n.Value);

            }

            return Convert.ToString(resultado,new CultureInfo("es-PE"));

        }

    }

}
