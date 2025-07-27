using Sistem.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistem.BLL.Interfaces
{
    public interface IRolService
    {
        Task<List<RolDTO>> Lista();
    }
}
