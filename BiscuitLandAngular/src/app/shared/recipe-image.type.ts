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

  constructor() { }
}
