export const Path_TempThumbnail: string = "/Content/Images/Temp/Thumbnails/";
export const Path_TempStandard: string = "/Content/Images/Temp/Standard/";
export const Path_Thumbnail: string = "/Content/Images/Recipes/Thumbnails/";
export const Path_Standard: string = "/Content/Images/Recipes/Standard/";

export class RecipeImage {
  RecipeID: string;
  ImageName: string;
  SortOrder: number;
  IsPrimary: boolean;
  IsTemp: boolean;
  ThumbnailPath: string;
  StandardPath: string;

  constructor(imageName?: string, isTemp?: boolean) {
    if (imageName) {
      this.ImageName = imageName;
    }

    if (isTemp) {
      this.IsTemp = isTemp;
    } else {
      this.IsTemp = false;
    }

    if (this.ImageName) {
      RecipeImage.setImagePaths(this);
    }
  }

  static setImagePaths(img: RecipeImage) {
    if (img.IsTemp) {
      img.ThumbnailPath = Path_TempThumbnail + img.ImageName;
      img.StandardPath = Path_TempStandard + img.ImageName;
    } else {
      img.ThumbnailPath = Path_Thumbnail + img.ImageName;
      img.StandardPath = Path_Standard + img.ImageName;
    }
  }
}
