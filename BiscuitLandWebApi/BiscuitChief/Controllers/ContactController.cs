using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BiscuitChief.Models;

namespace BiscuitChief.Controllers
{
    public class ContactController : ApiController
    {
        [Route("api/contact")]
        [HttpPost]
        public IHttpActionResult SendMessage(ContactUs _contactinfo)
        {
            try
            {
                string result = String.Empty;

                string body = PortalUtility.GetEmailTemplate("ContactUs.txt");
                body = body.Replace("#NAME#", _contactinfo.FullName);
                body = body.Replace("#EMAIL#", _contactinfo.EmailAddress);
                body = body.Replace("#SUBJECT#", _contactinfo.Subject);
                body = body.Replace("#MESSAGE#", _contactinfo.Message);

                result = PortalUtility.SendEmail(_contactinfo.Subject, body);

                if (String.IsNullOrEmpty(result))
                { result = "Message Sent"; }

                return Ok(result);
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}
