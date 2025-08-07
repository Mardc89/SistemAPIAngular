using Sistem.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.BLL.Interfaces
{
    public interface IMenuService
    {
        Task<List<MenuDTO>> Lista(int IdUsuario);
    }
}
