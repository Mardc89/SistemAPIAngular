using Microsoft.EntityFrameworkCore;
using Sistem.DAL.DBContext;
using Sistem.DAL.Interfaces;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DAL.Implementacion
{
    public class GenericRepository<TModel>:IGenericRepository<TModel> where TModel : class
    {
        private readonly DbsistAnContext _dbcontext;

        public GenericRepository(DbsistAnContext dbcontext)
        {
            _dbcontext = dbcontext;
        }        
        
        public async Task<TModel> Obtener(Expression<Func<TModel, bool>> filtro)
        {
            try
            {
                TModel model =await _dbcontext.Set<TModel>().FirstOrDefaultAsync(filtro);
                return model;

            }
            catch
            { 
                throw;
            }
        }        
        public async Task<TModel> Crear(TModel modelo)
        {
            try
            {
                _dbcontext.Set<TModel>().Add(modelo);
                await _dbcontext.SaveChangesAsync();
                return modelo;

            }
            catch
            {

                throw;
            }
        }
        public async Task<bool> Editar(TModel modelo)
        {
            try
            {
                _dbcontext.Set<TModel>().Update(modelo);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {

                throw;
            }
        }

        public async Task<bool> Eliminar(TModel modelo)
        {
            try
            {
                _dbcontext.Set<TModel>().Remove(modelo);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {

                throw;
            }
        }

        public async Task<IQueryable<TModel>> Consultar(Expression<Func<TModel, bool>> filtro = null)
        {
            try
            {
                IQueryable<TModel> query=filtro==null?_dbcontext.Set<TModel>():_dbcontext.Set<TModel>().Where(filtro);
                return query;   
            }
            catch
            {

                throw;
            }
        }





    }
}
