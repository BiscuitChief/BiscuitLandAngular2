using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using BiscuitChief.Models;

namespace BiscuitChief.Controllers
{
    public class AdminController : ApiController
    {
        [Authorize(Roles = "FULLACCESS")]
        [Route("api/GetAllowedDownloads")]
        [HttpGet]
        public IHttpActionResult GetAllowedLinks()
        {
            Dictionary<string, Boolean> sections = new Dictionary<string, Boolean>();

            bool allowdbscripts = false;
            bool allowrecipes = false;
            bool allowgenbackup = false;

            if (User.IsInRole("FULLACCESS")) { allowdbscripts = true; }
            if (User.IsInRole("FULLACCESS")) { allowrecipes = true; }
            if (User.IsInRole("ADMIN")) { allowgenbackup = true; }

            return Ok(new { AllowDbScripts = allowdbscripts, AllowRecipeScripts = allowrecipes, AllowGenerateBackup = allowgenbackup });
        }

        [Authorize(Roles = "ADMIN")]
        [Route("api/CreateDataBackupScripts")]
        [HttpPost]
        public IHttpActionResult CreateDataBackupScripts()
        {
            try
            {
                string recipesaveproc = "call Recipe_SaveRecipe('{0}','{1}',0,pRecipeID);";
                string ingredientsaveproc = "call Recipe_SaveIngredient(0,pRecipeID,'{0}',{1},'{2}','{3}','{4}',{5},pIngredientID);";
                string directionsaveproc = "call Recipe_SaveDirections(0,pRecipeID,{0},'{1}','{2}',pDirectionID);";
                string categorysaveproc = "call Recipe_SaveRecipeCategory(pRecipeID,'{0}');";
                string imagesaveproc = "call Recipe_SaveImage(pRecipeID,'{0}','{1}','{2}');";

                StringBuilder backupscript = new StringBuilder();
                backupscript.AppendLine("declare pRecipeID varchar(36);");
                backupscript.AppendLine("declare pIngredientID int;");
                backupscript.AppendLine("declare pDirectionID int;");
                backupscript.AppendLine();
                backupscript.AppendLine("TRUNCATE TABLE Recipe_Recipes;");
                backupscript.AppendLine("TRUNCATE TABLE Recipe_Ingredients;");
                backupscript.AppendLine("TRUNCATE TABLE Recipe_Directions;");
                backupscript.AppendLine("TRUNCATE TABLE Recipe_Categories;");
                backupscript.AppendLine("TRUNCATE TABLE Recipe_Images;");
                backupscript.AppendLine();

                List<Models.Recipe> recipes = Models.Recipe.SearchRecipes(String.Empty, new string[] { }, new string[] { });
                foreach (Models.Recipe item in recipes)
                {
                    Models.Recipe rcp = new Models.Recipe(item.RecipeID);

                    backupscript.AppendLine(String.Format(recipesaveproc, rcp.Title.Replace("'", "''"), rcp.Description.Replace("'", "''")));

                    foreach (Models.RecipeIngredient ing in rcp.IngredientList)
                    {
                        backupscript.AppendLine(String.Format(ingredientsaveproc, ing.IngredientName.Trim().Replace("'", "''"), ing.Quantity, ing.UnitOfMeasure.Replace("'", "''"), ing.Notes.Trim().Replace("'", "''"), Enum.GetName(ing.DisplayType.GetType(), ing.DisplayType), ing.SortOrder));
                    }

                    foreach (Models.RecipeDirection dir in rcp.DirectionList)
                    {
                        backupscript.AppendLine(String.Format(directionsaveproc, dir.SortOrder, dir.DirectionText.Trim().Replace("'", "''"), Enum.GetName(dir.DisplayType.GetType(), dir.DisplayType)));
                    }

                    foreach (Models.Recipe.Category ctg in rcp.CategoryList)
                    {
                        backupscript.AppendLine(String.Format(categorysaveproc, ctg.CategoryCode));
                    }

                    foreach (Models.RecipeImage img in rcp.ImageList)
                    {
                        backupscript.AppendLine(String.Format(imagesaveproc, img.ImageName, img.IsPrimary, img.SortOrder));
                    }
                    backupscript.AppendLine();
                    backupscript.AppendLine();
                }

                System.IO.File.WriteAllText(System.Web.Hosting.HostingEnvironment.MapPath("~/DownloadFiles/DataRestoreScript.txt"), backupscript.ToString());

                return Ok("Success");
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        [Authorize(Roles = "FULLACCESS")]
        [Route("api/AddNewUser")]
        [HttpPost]
        public IHttpActionResult AddNewUser(Login login)
        {
            try
            {
                string resultmsg = string.Empty;

                if (User.IsInRole("ADMIN"))
                { resultmsg = login.AddNewUser(); }
                else
                { resultmsg = "Success"; }

                return Ok(resultmsg);
            }
            catch (Exception ex)
            {
                PortalUtility.SendErrorEmail(ex);
                return new PortalUtility.PlainTextResult(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}
