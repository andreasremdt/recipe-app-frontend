import { useParams } from "@solidjs/router";
import { Component, createResource, Show } from "solid-js";

import RecipeEditor from "../components/recipe-editor";
import IngredientRenderer from "../components/ingredient-renderer";
import InstructionsRenderer from "../components/instructions-renderer";
import MainLayout from "../layouts/main";
import { fetch } from "../lib/recipe-fetcher";

const Page: Component = () => {
  const params = useParams();
  const [recipe, { mutate }] = createResource(params.id, fetch);

  return (
    <>
      <Show when={!recipe.loading} fallback={<p>Loading...</p>}>
        <MainLayout title={recipe().title} class="flex">
          <RecipeEditor recipe={recipe} onSave={mutate} />

          <div class="w-2/3 p-8">
            <header class="rounded-md bg-white py-12 px-4 text-center shadow-md">
              <h1 class="mb-2 text-3xl font-bold text-slate-900">{recipe().title}</h1>
              <Show when={recipe().description}>
                <p>{recipe().description}</p>
              </Show>
            </header>

            <IngredientRenderer ingredients={recipe().ingredients} />

            <InstructionsRenderer instructions={recipe().instructions} />
          </div>
        </MainLayout>
      </Show>
    </>
  );
};

export default Page;
