using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sistem.DAL.DBContext;
using Sistem.DAL.Implementacion;
using Sistem.DAL.Interfaces;
using Sistem.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.IOC
{
    public static class Dependencia
    {
        public static void InyectarDependencias(this IServiceCollection services,IConfiguration configuration) {

            services.AddDbContext<DbsistAnContext>(options =>{
                options.UseSqlServer(configuration.GetConnectionString("CadenaSQL"));
            });

            services.AddTransient(typeof(IGenericRepository<>),typeof(GenericRepository<>));
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddMapster();

            MappingConfig.RegisterMapping(TypeAdapterConfig.GlobalSettings);
        }
    }
}
