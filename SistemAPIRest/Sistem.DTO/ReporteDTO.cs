﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.DTO
{
    public class ReporteDTO
    {
        public string? NumeroDocumento { get; set; }

        public string? FechaRegistro { get; set; }

        public string? TotalPedido { get; set; }

        public string? Producto { get; set; }

        public int? Cantidad { get; set; }

        public string? Precio { get; set; }

        public string? Total { get; set; }
    }
}
