using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sistem.API.Utilidad;
using Sistem.BLL.Interfaces;
using Sistem.DTO;

namespace Sistem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly IRolService _rolService;

        public RolController(IRolService rolServicio)
        {
            _rolService = rolServicio;
                
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista() 
        {
            var rsp = new Response<List<RolDTO>>();

            try
            {
                rsp.status = true;
                rsp.value = await _rolService.Lista();

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
