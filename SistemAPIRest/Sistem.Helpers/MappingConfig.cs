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
                .Map(dest => dest.EsActivo, src => src.EsActivo == true ? 1 : 0);

            config.NewConfig<Usuario, SesionDTO>().
                Map(dest => dest.RolDescripcion, src => src.IdRolNavigation.Nombre);

            config.NewConfig<UsuarioDTO, Usuario>()
                .Ignore(dest => dest.IdRolNavigation)
                .Map(dest => dest.EsActivo, src => src.EsActivo == 1 ? true : false);
            #endregion

            #region Categoria            
            config.NewConfig<Categoria, CategoriaDTO>().TwoWays();
            #endregion


            #region Producto
            config.NewConfig<Producto, ProductoDTO>()
                .Map(dest => dest.DescripcionCategoria, src => src.IdCategoriaNavigation.Nombre)
                .Map(dest => dest.Precio, src => Convert.ToString(src.Precio.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.EsActivo, src => src.EsActivo == true ? 1 : 0);

            config.NewConfig<ProductoDTO, Producto>()
                .Ignore(dest => dest.IdCategoriaNavigation)
                .Map(dest => dest.Precio, src => Convert.ToDecimal(src.Precio, new CultureInfo("es-PE")))
                .Map(dest => dest.EsActivo, src => src.EsActivo == 1 ? true : false);
            #endregion

            #region Pedido
            config.NewConfig<Pedido, PedidoDTO>()
                .Map(dest => dest.TotalTexto, src => Convert.ToString(src.Total.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.FechaRegistro, src => src.FechaRegistro.Value.ToString("dd/MM/yyyy"));

            config.NewConfig<PedidoDTO, Pedido>()
                .Map(dest => dest.Total, src => Convert.ToDecimal(src.TotalTexto, new CultureInfo("es-PE")));
            #endregion

            #region DetallePedido
            config.NewConfig<DetallePedido, DetallePedidoDTO>()
                .Map(dest => dest.DescripcionProducto, src => src.IdProductoNavigation.Nombre)
                .Map(dest => dest.PrecioTexto, src => Convert.ToString(src.Precio.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.TotalTexto, src => Convert.ToString(src.Total.Value, new CultureInfo("es-PE")));

            config.NewConfig<DetallePedidoDTO, DetallePedido>()
                 .Map(dest => dest.Precio, src => Convert.ToDecimal(src.PrecioTexto, new CultureInfo("es-PE")))
                 .Map(dest => dest.Total, src => Convert.ToDecimal(src.TotalTexto, new CultureInfo("es-PE")));
            #endregion

            #region Reporte
            config.NewConfig<DetallePedido, ReporteDTO>()
                .Map(dest => dest.FechaRegistro, src => src.IdPedidoNavigation.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                .Map(dest => dest.NumeroDocumento, src => src.IdPedidoNavigation.Numerodocumento)
                .Map(dest => dest.TotalPedido, src => Convert.ToString(src.IdPedidoNavigation.Total.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.Producto, src => src.IdProductoNavigation.Nombre)
                .Map(dest => dest.Precio, src => Convert.ToString(src.Precio.Value, new CultureInfo("es-PE")))
                .Map(dest => dest.Total, src => Convert.ToString(src.IdPedidoNavigation.Total.Value, new CultureInfo("es-PE")));
            #endregion
        }
    }
}
