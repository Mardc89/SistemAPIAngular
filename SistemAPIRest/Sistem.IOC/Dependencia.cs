﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            services.AddDbContext<DbContext>(options =>{
                options.UseSqlServer(configuration.GetConnectionString("CadenaSQL"));
            });
        }
    }
}
