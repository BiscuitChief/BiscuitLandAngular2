using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace BiscuitChief.Models
{
    public class ContactUs
    {
        public string EmailAddress { get; set; }

        public string FullName { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
    }
}