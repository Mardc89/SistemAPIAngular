using Mapster;
using Sistem.DTO;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.Helpers
{
    public static class MappingConfig
    {
        public static void RegisterMapping(TypeAdapterConfig config)
        {
            config.NewConfig<Rol, RolDTO>().TwoWays();

            config.NewConfig<Menu, MenuDTO>().TwoWays();

            config.NewConfig<Usuario, UsuarioDTO>()
                .Map(dest => dest.RolDescripcion, src => src.IdRolNavigation.Nombre)
                .Map(dest => dest.EsActivo, src => src.EsActivo==true? 1:0);

            config.NewConfig<UsuarioDTO, Usuario>()
                .Ignore(dest => dest.IdRolNavigation)
                .Map(dest => dest.EsActivo, src => src.EsActivo ==1?true:false);
        }
    }
}
