using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml;
using System.IO;

namespace BiscuitChief.Controllers
{
    public class NavItemController : ApiController
    {
        [Route("api/gettopnavigation")]
        [HttpGet]
        public IHttpActionResult GetTopNavigation()
        {
            try
            { return Ok(Models.NavItem.GetTopNavigation()); }
            catch(Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}