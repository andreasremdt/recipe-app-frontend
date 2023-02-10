import fetcher from "./fetcher";
import { parseFromDatabase, transformRecipeForUpdate } from "./utils";
import { Recipe } from "../types/recipe";

interface RecipeResponse {
  id: string;
  title: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  thumbnailUrl?: string;
}

export async function fetch(recipeId: string): Promise<Recipe> {
  const recipe = await fetcher<RecipeResponse>("GET", `/api/recipes/${recipeId}`);

  return {
    ...recipe,
    ingredients: parseFromDatabase(recipe.ingredients),
    instructions: parseFromDatabase(recipe.instructions),
  };
}

export async function create(recipe: Recipe): Promise<Recipe> {
  const transformed = transformRecipeForUpdate(recipe);

  return fetcher<Recipe>("POST", "/api/recipes", transformed);
}

export async function update(recipe: Recipe): Promise<Recipe> {
  const transformed = transformRecipeForUpdate(recipe);

  return await fetcher<Recipe>("PATCH", `/api/recipes/${recipe.id}`, transformed);
}
