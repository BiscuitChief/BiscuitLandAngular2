using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BiscuitChief.Models;
using System.IO;
using System.Drawing;
using System.Web;

namespace BiscuitChief.Controllers
{
    public class RecipesController : ApiController
    {
        [Route("api/recipes/canedit")]
        [HttpGet]
        public IHttpActionResult CanUserEditRecipes()
        {
            try
            {
                return Ok(User.IsInRole("FULLACCESS"));
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/categories")]
        [HttpGet]
        public IHttpActionResult GetAllCategories()
        {
            try
            {
                List<Models.Recipe.Category> categories = Models.Recipe.Category.GetAllCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/search")]
        [HttpPost]
        public IHttpActionResult Search(Models.RecipeSearch searchdata)
        {
            try
            {
                string[] categories = (from itm in searchdata.SearchCategoryList where itm.IsSelected select itm.CategoryCode).ToArray();
                List<Models.Recipe> allresults = Models.Recipe.SearchRecipes(searchdata.SearchText, new string[] { }, categories);
                searchdata.SearchResultText = allresults.Count.ToString() + " Recipies Found";
                searchdata.PageSize = 10;
                searchdata.PageCount = PortalUtility.PagerHelper.GetPageCount(searchdata.PageSize, allresults.Count);
                searchdata.PageNumber = PortalUtility.PagerHelper.CheckPageValid(searchdata.PageNumber, searchdata.PageCount);
                if (searchdata.PageNumber < 1)
                { searchdata.PageNumber = 1; }
                searchdata.SearchResults = new List<Models.Recipe>();

                if (allresults.Count > 0)
                {
                    int startindex = ((searchdata.PageNumber - 1) * searchdata.PageSize);
                    int range = searchdata.PageSize;
                    if (startindex + range > allresults.Count)
                    { range = allresults.Count - startindex; }
                    searchdata.SearchResults = allresults.GetRange(startindex, range);
                }

                return Ok(searchdata);
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/recipe/{recipeId}")]
        [HttpGet]
        public IHttpActionResult GetRecipe(string recipeId, int quantity = 1)
        {
            try
            {
                return Ok(new Recipe(recipeId, quantity));
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/save")]
        [Authorize(Roles = "FULLACCESS")]
        [HttpPost]
        public IHttpActionResult SaveRecipe(Models.Recipe rcp)
        {
            try
            {
                if (User.IsInRole("ADMIN"))
                {
                    int index = 0;
                    foreach (Models.RecipeIngredient ing in rcp.IngredientList)
                    { ing.SortOrder = index++; }
                    index = 0;
                    foreach (Models.RecipeDirection dir in rcp.DirectionList)
                    { dir.SortOrder = index++; }
                    index = 0;
                    foreach (Models.RecipeImage img in rcp.ImageList)
                    { img.SortOrder = index++; }

                    rcp.SaveRecipe();
                }

                return Ok(rcp.RecipeID);
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/delete/{recipeId}")]
        [Authorize(Roles = "FULLACCESS")]
        [HttpDelete]
        public IHttpActionResult DeleteRecipe(string recipeId)
        {
            try
            {
                if (User.IsInRole("ADMIN"))
                { Models.Recipe.DeleteRecipe(recipeId); }

                return Ok();
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Route("api/recipes/uploadimage")]
        [Authorize(Roles = "FULLACCESS")]
        [HttpPost]
        public IHttpActionResult UploadImage()
        {
            if (User.IsInRole("ADMIN"))
            {
                try
                {
                    PortalUtility.CleanupTempFiles();
                    string imagelist = String.Empty;
                    foreach (string file in HttpContext.Current.Request.Files)
                    {
                        HttpPostedFile fileContent = HttpContext.Current.Request.Files[file];
                        if (fileContent != null && fileContent.ContentLength > 0)
                        {

                            // get a stream
                            string imagename = GetImageName();
                            string path_thumb = Path.Combine(HttpContext.Current.Server.MapPath(Models.RecipeImage.Path_TempThumbnail), imagename);
                            string path_full = Path.Combine(HttpContext.Current.Server.MapPath(Models.RecipeImage.Path_TempStandard), imagename);

                            Stream stream = fileContent.InputStream;
                            Image img = Image.FromStream(stream);

                            Image thumbimg = PortalUtility.ScaleImage(img, 100, 100);
                            thumbimg.Save(path_thumb, System.Drawing.Imaging.ImageFormat.Png);

                            Image regimg = PortalUtility.ScaleImage(img, 800, 600);
                            regimg.Save(path_full, System.Drawing.Imaging.ImageFormat.Png);

                            imagelist += imagename + ",";

                        }
                    }
                    imagelist = imagelist.Trim(',');
                    string[] returnval = imagelist.Split(',');
                    return Ok(returnval);
                }
                catch (Exception ex)
                {
                    PortalUtility.SendErrorEmail(ex);
                    return new PortalUtility.PlainTextResult("Upload failed: " + ex.Message, HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                return new PortalUtility.PlainTextResult("Demo login does not allow image uploads.", HttpStatusCode.Unauthorized);
            }
        }

        [Route("api/recipes/deletetempimage")]
        [Authorize(Roles = "FULLACCESS")]
        [HttpDelete]
        public IHttpActionResult DeleteTempImage(string imagename)
        {
            try
            {
                if (User.IsInRole("ADMIN"))
                {
                    PortalUtility.CleanupTempFiles();
                    string path_thumb = Path.Combine(HttpContext.Current.Server.MapPath(Models.RecipeImage.Path_TempThumbnail), imagename);
                    string path_full = Path.Combine(HttpContext.Current.Server.MapPath(Models.RecipeImage.Path_TempStandard), imagename);
                    if (File.Exists(path_thumb)) { File.Delete(path_thumb); }
                    if (File.Exists(path_full)) { File.Delete(path_full); }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult("Upload failed: " + ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        private string GetImageName()
        {
            string filename = String.Empty;
            Random randnum = new Random();

            for (int i = 0; i <= 5; i++)
            { filename += (char)(randnum.Next(65, 90)); }
            filename += String.Format("{0:yyyyMMddhhmmssmmmm}", DateTime.Now);
            filename += ".png";

            return filename;
        }
    }
}
