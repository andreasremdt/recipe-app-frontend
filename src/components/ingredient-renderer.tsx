import { Index, Show } from "solid-js";

import type { JSONContent } from "@tiptap/core";
import type { Component } from "solid-js";

import parseIngredients from "../lib/recipe-parser";

interface Props {
  ingredients: JSONContent;
}

const IngredientRenderer: Component<Props> = (props) => {
  return (
    <div class="mt-8">
      <h2 class="mb-2 text-xl font-bold text-slate-900">Ingredients</h2>

      <Show
        when={parseIngredients(props.ingredients).length}
        fallback={<p>This recipe does not have any ingredients, yet.</p>}
      >
        <div class="-mx-4 flex gap-x-2">
          <Index each={parseIngredients(props.ingredients)}>
            {(group) => (
              <div class="flex-1 border-l border-slate-300 px-4 first-of-type:border-l-0">
                <Show when={group().content}>
                  <h3 class="text-lg font-semibold text-slate-900">{group().content}</h3>
                </Show>
                <ul>
                  <Index each={group().children}>
                    {(item) => (
                      <li class="border-b border-slate-300 py-2 last-of-type:border-b-0">
                        {item().content}
                      </li>
                    )}
                  </Index>
                </ul>
              </div>
            )}
          </Index>
        </div>
      </Show>
    </div>
  );
};

export default IngredientRenderer;
