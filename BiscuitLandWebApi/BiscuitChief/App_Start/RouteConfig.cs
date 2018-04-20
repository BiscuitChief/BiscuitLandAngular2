using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BiscuitChief
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute(""); //Allow index.html to load
            routes.IgnoreRoute("partials/*");
            routes.IgnoreRoute("assets/*");
            routes.MapPageRoute("Default", "{*anything}", "~/index.html");
        }
    }
}
