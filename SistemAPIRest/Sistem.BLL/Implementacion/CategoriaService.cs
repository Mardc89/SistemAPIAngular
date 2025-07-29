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
    public class CategoriaService : ICategoriaService
    {
        private readonly IGenericRepository<Categoria> _repositorioCategoria;
        private readonly IMapper _mapper;
        public CategoriaService(IGenericRepository<Categoria> repositorioCategoria, IMapper mapper)
        {
            _repositorioCategoria = repositorioCategoria;
            _mapper = mapper;
        }
        public async Task<List<CategoriaDTO>> Lista()
        {
            try
            {
                var listaCategoria = await _repositorioCategoria.Consultar();
                return _mapper.Map<List<CategoriaDTO>>(listaCategoria.ToList());

            }
            catch
            {

                throw;
            }
        }
    }
}
