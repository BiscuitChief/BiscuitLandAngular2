using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace BiscuitChief
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            // Route to index.html
            config.Routes.MapHttpRoute(
                name: "Index",
                routeTemplate: "dist/{id}.html",
                defaults: new { id = "index" });

            // Default route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
