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


        private IQueryable<Pedido> _retornarPedidos(IQueryable<Pedido> tablaPedido, int restarCantidadDias) {
            DateTime? ultimaFecha = tablaPedido.OrderByDescending(c => c.FechaRegistro).Select(n => n.FechaRegistro).First();
            ultimaFecha = ultimaFecha.Value.AddDays(restarCantidadDias);

            return tablaPedido.Where(s => s.FechaRegistro.Value.Date >= ultimaFecha.Value.Date);
        }

        private async Task<int> TotalPedidosUltimaSemana() {
            int total = 0;
            IQueryable<Pedido> _pedidoQuery = await _pedidoRepository.Consultar();

            if (_pedidoQuery.Count() > 0) {
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

                resultado = tablaPedido.Select(s => s.Total).Sum(s => s.Value);

            }

            return Convert.ToString(resultado, new CultureInfo("es-PE"));

        }

        private async Task<int> TotalProductos() {

            IQueryable<Producto> _productoQuery = await _productoRepositorio.Consultar();

            int total = _productoQuery.Count();

            return total;


        }

        private async Task<Dictionary<string, int>> PedidosUltimaSemana(){


            Dictionary<string, int> resultado = new Dictionary<string, int>();

            IQueryable<Pedido> _pedidoQuery=await _pedidoRepository.Consultar();

            if (_pedidoQuery.Count() > 0){
                var tablapedido = _retornarPedidos(_pedidoQuery, -7);

                resultado = tablapedido
                    .GroupBy(s => s.FechaRegistro.Value.Date).OrderBy(g => g.Key)
                    .Select(d => new { fecha = d.Key.ToString("dd/MM/yyyy"), total = d.Count() })
                    .ToDictionary(keySelector: r => r.fecha, elementSelector: r => r.total);
            }

            return resultado;



        }

        public async Task<DashBoardDTO> Resumen()
        {
            DashBoardDTO dashboardDTO = new DashBoardDTO();

            try
            {
                dashboardDTO.TotalPedidos = await TotalPedidosUltimaSemana();
                dashboardDTO.TotalIngresos = await TotalIngresosUltimaSemana();
                dashboardDTO.TotalProductos = await TotalProductos();

                List<PedidosSemanaDTO> listaPedidosSemana=new List<PedidosSemanaDTO>();

                foreach (KeyValuePair<string,int> item in await PedidosUltimaSemana()) {
                    listaPedidosSemana.Add(new PedidosSemanaDTO() {
                        Fecha = item.Key,
                        Total = item.Value
                    });
                }

                dashboardDTO.PedidosUltimaSemana = listaPedidosSemana;

            }
            catch
            {

                throw;
            }

            return dashboardDTO;
        }




    }

}
