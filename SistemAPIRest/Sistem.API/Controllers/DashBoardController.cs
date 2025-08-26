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
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService _dasbordService;

        public DashBoardController(IDashBoardService dasbordService)
        {
            _dasbordService = dasbordService;
        }

        [HttpGet]
        [Route("Resumen")]
        public async Task<IActionResult> Resumen()
        {
            var rsp = new Response<DashBoardDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _dasbordService.Resumen();

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
