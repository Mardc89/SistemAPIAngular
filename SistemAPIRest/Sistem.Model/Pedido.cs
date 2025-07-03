using System;
using System.Collections.Generic;

namespace Sistem.Model;

public partial class Pedido
{
    public int IdPedido { get; set; }

    public string? Numerodocumento { get; set; }

    public decimal? Total { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();
}
