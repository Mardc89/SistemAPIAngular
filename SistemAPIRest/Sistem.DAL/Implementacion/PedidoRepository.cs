using Sistem.DAL.DBContext;
using Sistem.DAL.Interfaces;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DAL.Implementacion
{
    public class PedidoRepository : GenericRepository<Pedido>, IPedidoRepository
    {
        private readonly DbsistAnContext  _dbContext;

        public PedidoRepository(DbsistAnContext dbContext):base(dbContext)
        {
            _dbContext = dbContext;
                
        }
        public Task<Pedido> Registrar(Pedido modelo)
        {
            throw new NotImplementedException();
        }
    }
}
