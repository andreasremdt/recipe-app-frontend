import { Component, createResource, Index } from "solid-js";

import RecipePreview from "../components/recipe-preview";
import MainLayout from "../layouts/main";
import fetcher from "../lib/fetcher";
import type { Recipe } from "../types/recipe";

const fetchRecipes = async () => fetcher<Recipe[]>("GET", `/api/recipes`);

const Page: Component = () => {
  const [recipes] = createResource(fetchRecipes);

  return (
    <MainLayout>
      <ul class="grid grid-cols-4 gap-6 p-6">
        <Index each={recipes()}>
          {(recipe) => (
            <li>
              <RecipePreview recipe={recipe} />
            </li>
          )}
        </Index>
      </ul>
    </MainLayout>
  );
};

export default Page;
