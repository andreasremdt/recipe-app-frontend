import { A } from "@solidjs/router";
import { Accessor, Component, Show } from "solid-js";

import type { Recipe } from "../types/recipe";

interface Props {
  recipe: Accessor<Recipe>;
}

const RecipePreview: Component<Props> = (props) => (
  <A
    href={`/recipes/${props.recipe().id}`}
    class="block h-full overflow-hidden rounded-md bg-white shadow-md transition-transform hover:-translate-y-1"
  >
    <Show when={props.recipe().thumbnailUrl}>
      <img
        src={props.recipe().thumbnailUrl}
        alt={props.recipe().title}
        width="400"
        height="200"
        class="h-44 w-full object-cover"
      />
    </Show>
    <div class="px-4 py-2">
      <h2 class="text-lg font-bold text-slate-900">{props.recipe().title}</h2>
      <Show when={props.recipe().description}>
        <p class="text-sm">{props.recipe().description}</p>
      </Show>
    </div>
  </A>
);

export default RecipePreview;
