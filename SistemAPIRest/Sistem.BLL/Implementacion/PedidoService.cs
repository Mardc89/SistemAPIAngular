using MapsterMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<PedidoDTO>> Historial(string buscarPor, string numeroPedido, string fechaInicio, string fechaFin)
        {
            IQueryable<Pedido> query = await _pedidoRepositorio.Consultar();
            var ListaResultado=new List<Pedido>();

            try
            {
                if (buscarPor=="fecha")
                {
                    DateTime fechInicio = DateTime.ParseExact(fechaInicio,"dd/MM/yyyy",new CultureInfo("es-PE"));
                    DateTime fechFin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-PE"));

                    ListaResultado = await query.Where(u =>u.FechaRegistro.Value.Date >= fechInicio.Date &&
                     u.FechaRegistro.Value.Date <= fechFin.Date
                     ).Include(m => m.DetallePedidos).ThenInclude(p => p.IdPedidoNavigation)
                     .ToListAsync();
                }
                else
                {
                    ListaResultado = await query.Where(u => u.Numerodocumento==numeroPedido)
                    .Include(m => m.DetallePedidos).ThenInclude(p => p.IdPedidoNavigation)
                    .ToListAsync();

                }

                return _mapper.Map<List<PedidoDTO>>(ListaResultado);
            }
            catch
            {

                throw;
            }

        }



        public async Task<List<ReporteDTO>> Reporte(string fechaInicio, string fechaFin)
        {
            IQueryable<DetallePedido> query = await _detallePedidoRepositorio.Consultar();
            var ListaResultado = new List<DetallePedido>();

            try
            {
                DateTime fechInicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-PE"));
                DateTime fechFin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-PE"));
                
                ListaResultado = await query.Include(p => p.IdProductoNavigation)
                    .Include(m=>m.IdPedidoNavigation)
                    .Where(n=>n.IdPedidoNavigation.FechaRegistro.Value.Date>=fechInicio.Date &&
                    n.IdPedidoNavigation.FechaRegistro.Value.Date >= fechFin.Date
                    ).ToListAsync();

                return _mapper.Map<List<ReporteDTO>>(ListaResultado);
            }
            catch
            {

                throw;
            }
        }
    }
}
