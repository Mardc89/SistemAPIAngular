using Sistem.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject.DTOs
{
    public class CategoriaDTOTest:BaseTests
    {
        [Theory]
        [InlineData("",1)]
        public void validateModel_ReturnsCorrect(string name,int errors)
        {
            var request = new CategoriaDTO
            {
                Nombre = name

            };

            var errorList=ValidateModel(request);
            Assert.Equal(errors,errorList.Count);


        }
    }
}
