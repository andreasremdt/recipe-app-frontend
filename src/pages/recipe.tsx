import { useParams } from "@solidjs/router";
import { Component, createResource, Index, Show } from "solid-js";
import Editor from "../components/editor";

import MainLayout from "../layouts/main";
import fetcher from "../lib/fetcher";
import parse from "../lib/recipe-parser";
import type { Recipe } from "../types/recipe";

const fetchRecipe = async (id: string) => fetcher<Recipe>("GET", `/api/recipes/${id}`);

const Page: Component = () => {
  const params = useParams();
  const [recipe, { mutate }] = createResource(params.id, fetchRecipe);

  return (
    <>
      <Show when={!recipe.loading} fallback={<p>Loading...</p>}>
        <MainLayout title={recipe().title} class="flex gap-x-12">
          <Editor recipe={recipe} onSave={mutate} />

          <div class="w-2/3 py-8">
            <header class="mb-3 border-b border-slate-300 pb-3">
              <h1 class="text-3xl font-bold text-slate-900">{recipe().title}</h1>
            </header>

            <p>{recipe().description}</p>
            <span>{recipe.loading && "Loading..."}</span>

            <div class="mt-8 flex gap-x-16">
              <aside>
                <h2 class="mb-2 text-xl font-bold text-slate-900">Ingredients</h2>
                <ul class="list-disc pl-4">
                  <Index each={parse(recipe().ingredients)}>
                    {(ingredient) => <li>{ingredient()}</li>}
                  </Index>
                </ul>
              </aside>

              <section>
                <h2 class="mb-2 text-xl font-bold text-slate-900">Instructions</h2>

                <ol class="list-decimal pl-4">
                  <Index each={parse(recipe().instructions)}>
                    {(instruction) => <li>{instruction()}</li>}
                  </Index>
                </ol>
              </section>
            </div>
          </div>
        </MainLayout>
      </Show>
    </>
  );
};

export default Page;
