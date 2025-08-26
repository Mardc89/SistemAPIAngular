using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sistem.API.Utilidad;
using Sistem.BLL.Implementacion;
using Sistem.BLL.Interfaces;
using Sistem.DTO;

namespace Sistem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoService _pedidoService;
        public PedidoController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpGet]
        [Route("Historial")]
        public async Task<IActionResult> Historial(string buscarPor,string? numeroPedido,string? fechaInicio,string? fechaFin)
        {
            var rsp = new Response<List<PedidoDTO>>();
            numeroPedido = numeroPedido is null ? "": numeroPedido;
            fechaInicio= fechaInicio is null ? "" : fechaInicio;
            fechaFin  = fechaFin is null ? "" : fechaFin;

            try
            {
                rsp.status = true;
                rsp.value = await _pedidoService.Historial(buscarPor,numeroPedido,fechaInicio,fechaFin);

            }
            catch (Exception ex)
            {

                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);


        }

        [HttpGet]
        [Route("Reporte")]
        public async Task<IActionResult> Historial(string? fechaInicio, string? fechaFin)
        {
            var rsp = new Response<List<ReporteDTO>>();

            try
            {
                rsp.status = true;
                rsp.value = await _pedidoService.Reporte(fechaInicio, fechaFin);

            }
            catch (Exception ex)
            {

                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);


        }



        [HttpGet]
        [Route("Registar")]
        public async Task<IActionResult> Guardar([FromBody] PedidoDTO pedido)
        {
            var rsp = new Response<PedidoDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _pedidoService.Registrar(pedido);

            }
            catch (Exception ex)
            {

                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);


        }
    }
}
