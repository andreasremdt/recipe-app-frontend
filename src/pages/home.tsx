import { Component, createResource, Index } from "solid-js";

import MainLayout from "../layouts/main";
import fetcher from "../lib/fetcher";
import { Recipe } from "../types/recipe";

const fetchRecipes = async () => fetcher<Recipe[]>("GET", `/api/recipes`);

const Page: Component = () => {
  const [recipes] = createResource(fetchRecipes);

  return (
    <MainLayout title="My Recipes">
      <ul class="list-disc pl-4">
        <Index each={recipes()}>
          {(recipe) => (
            <li>
              <div>{recipe().title}</div>
              <div>{recipe().description}</div>
            </li>
          )}
        </Index>
      </ul>
    </MainLayout>
  );
};

export default Page;
