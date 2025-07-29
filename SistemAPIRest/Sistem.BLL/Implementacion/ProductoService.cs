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
    public class ProductoService : IProductoService
    {
        private readonly IGenericRepository<Producto> _repositorioProducto;
        private readonly IMapper _mapper;
        public ProductoService(IGenericRepository<Producto> repositorioProducto, IMapper mapper)
        {
            _repositorioProducto = repositorioProducto;
            _mapper = mapper;
        }
        public Task<ProductoDTO> Crear(ProductoDTO modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Editar(ProductoDTO modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Eliminar(int d)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductoDTO>> Lista()
        {
            try
            {
                var listaProductos = await _repositorioProducto.Consultar();
                return _mapper.Map<List<ProductoDTO>>(listaProductos.ToList());
            }
            catch
            {

                throw;
            }
        }
    }
}
