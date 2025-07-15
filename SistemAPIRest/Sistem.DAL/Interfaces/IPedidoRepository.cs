using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DAL.Interfaces
{
    public interface IPedidoRepository:IGenericRepository<Pedido>
    {
        Task<Pedido> Registrar(Pedido modelo);
    }
}
