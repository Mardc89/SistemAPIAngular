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
    public class RolService:IRolService
    {
        private readonly IGenericRepository<Rol> _rolRepositorio;
        private readonly IMapper _mapper;
        public RolService(IGenericRepository<Rol> rolRepositorio, IMapper mapper)
        {
            _rolRepositorio = rolRepositorio;
            _mapper=mapper;
                
        }

        public async Task<List<RolDTO>> Lista()
        {
            try
            {
                var ListaRoles = await _rolRepositorio.Consultar();
                return _mapper.Map<List<RolDTO>>(ListaRoles).ToList();
            }
            catch
            {
                throw;
            }
        
        }
    }
}
