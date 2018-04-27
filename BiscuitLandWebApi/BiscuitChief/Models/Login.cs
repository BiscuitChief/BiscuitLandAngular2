using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Web.Configuration;

namespace BiscuitChief.Models
{
    public partial class Login
    {
        #region Public Properties

        public string UserName { get; set; }

        public string Password { get; set; }

        #endregion

        #region Private Properties

        private string EncryptionSeed { get; set; }

        #endregion
    }
}