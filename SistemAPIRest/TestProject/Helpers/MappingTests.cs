using Mapster;
using MapsterMapper;
using Sistem.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace TestProject.Helpers
{
    public class MappingTests
    {
        private readonly IMapper _mapper;
        private readonly TypeAdapterConfig _config;
        public MappingTests()
        {
            _config = new TypeAdapterConfig();
            MappingConfig.RegisterMapping(_config);
            _mapper = new MapsterMapper.Mapper(_config);
                
        }
    }
}
