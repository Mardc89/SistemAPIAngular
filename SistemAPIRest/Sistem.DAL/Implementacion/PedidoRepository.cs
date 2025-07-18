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
        public async Task<Pedido> Registrar(Pedido modelo)
        {
            Pedido pedidoGenerado = new Pedido();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {

                    foreach (DetallePedido dv in modelo.DetallePedidos){
                        Producto productoEncontrado=_dbContext.Productos.Where(p=>p.IdProducto==dv.IdProducto).First();

                        productoEncontrado.Stock = productoEncontrado.Stock - dv.Cantidad;
                        _dbContext.Productos.Update(productoEncontrado);
                    }
                    await _dbContext.SaveChangesAsync();
                    NumeroDocumento correlativo = _dbContext.NumeroDocumentos.First();

                    correlativo.UltimoNumero = correlativo.UltimoNumero + 1;
                    correlativo.FechaRegistro=DateTime.Now;

                    _dbContext.NumeroDocumentos.Update(correlativo);
                    await _dbContext.SaveChangesAsync();

                    int cantidadDigitos = 4;
                    string ceros = string.Concat(Enumerable.Repeat("0", cantidadDigitos));
                    string numeroPedido = ceros + correlativo.UltimoNumero.ToString();

                    numeroPedido = numeroPedido.Substring(numeroPedido.Length - cantidadDigitos, cantidadDigitos);
                    modelo.Numerodocumento = numeroPedido;

                    await _dbContext.AddAsync(modelo);
                    await _dbContext.SaveChangesAsync();

                    pedidoGenerado = modelo;

                    transaction.Commit();


                }
                catch 
                {
                    transaction.Rollback();
                    throw;
                }

                return pedidoGenerado;

            }
        }
    }
}
