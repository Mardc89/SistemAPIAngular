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
    public class MenuService : IMenuService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IGenericRepository<MenuRol> _menuRolRepositorio;
        private readonly IGenericRepository<Menu> _menuRepositorio;
        private readonly IMapper _mapper;
        
        public MenuService(IGenericRepository<Usuario> usuarioRepositorio, 
             IGenericRepository<MenuRol> menuRolRepositorio,
             IGenericRepository<Menu> menuRepositorio,
             IMapper mapper)
        
        {
            _usuarioRepositorio = usuarioRepositorio;
            _menuRolRepositorio=menuRolRepositorio;
            _menuRepositorio = menuRepositorio;
            _mapper = mapper;

        }
        public async Task<List<MenuDTO>> Lista(int IdUsuario)
        {
            IQueryable<Usuario> Usuario = await _usuarioRepositorio.Consultar(u => u.IdUsuario == IdUsuario);
            IQueryable<MenuRol> MenuRol = await _menuRolRepositorio.Consultar();
            IQueryable<Menu> Menu= await _menuRepositorio.Consultar();

            try
            {
                IQueryable<Menu> Resultado=(from u in Usuario
                                            join mr in MenuRol on u.IdRol equals mr.IdRol
                                            join m  in Menu    on mr.IdMenu equals m.IdMenu
                                            select m).AsQueryable();

                var ListaRoles = Resultado.ToList();

                return _mapper.Map<List<MenuDTO>>(ListaRoles);
                    
            }
            catch 
            {

                throw;
            }
        }
    }
}
