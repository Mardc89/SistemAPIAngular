using Mapster;
using Sistem.DTO;
using Sistem.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.Helpers
{
    public static class MappingConfig
    {
        public static void RegisterMapping(TypeAdapterConfig config)
        {
            #region Rol
            config.NewConfig<Rol, RolDTO>().TwoWays();
            #endregion

            #region Menu
            config.NewConfig<Menu, MenuDTO>().TwoWays();
            #endregion

            #region Usuario
            config.NewConfig<Usuario, UsuarioDTO>()
                .Map(dest => dest.RolDescripcion, src => src.IdRolNavigation.Nombre)
                .Map(dest => dest.EsActivo, src => src.EsActivo==true? 1:0);

            config.NewConfig<Usuario, SesionDTO>().
                Map(dest => dest.RolDescripcion, src => src.IdRolNavigation.Nombre);

            config.NewConfig<UsuarioDTO, Usuario>()
                .Ignore(dest => dest.IdRolNavigation)
                .Map(dest => dest.EsActivo, src => src.EsActivo ==1?true:false);
            #endregion

            #region Categoria            
            config.NewConfig<Categoria, CategoriaDTO>().TwoWays();
            #endregion


            #region Producto
            config.NewConfig<Producto, ProductoDTO>()
                .Map(dest => dest.DescripcionCategoria, src => src.IdCategoriaNavigation.Nombre)
                .Map(dest => dest.Precio, src => Convert.ToString(src.Precio.Value, new CultureInfo("es-PE")))
                .Map(dest=>dest.EsActivo,src=>src.EsActivo==true?1:0);

            config.NewConfig<ProductoDTO, Producto>()
                .Ignore(dest => dest.IdCategoriaNavigation)
                .Map(dest => dest.Precio, src => Convert.ToDecimal(src.Precio, new CultureInfo("es-PE")))
                .Map(dest => dest.EsActivo, src => src.EsActivo == 1 ? true :false);
            #endregion

            #region Pedido
            config.NewConfig<Pedido, PedidoDTO>()
                .Map(dest => dest.TotalTexto, src => Convert.ToString(src.Total.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.FechaRegistro, src => src.FechaRegistro.Value.ToString("dd/MM/yyyy"));

            config.NewConfig<PedidoDTO, Pedido>()
                .Map(dest => dest.Total, src => Convert.ToDecimal(src.TotalTexto.Value, new CultureInfo("es-PE")));
            #endregion
        }
    }
}
