import { Index, Match, Show, Switch } from "solid-js";

import type { JSONContent } from "@tiptap/core";
import type { Component } from "solid-js";

import { parseInstructions } from "../lib/parser";

interface Props {
  instructions: JSONContent;
}

const InstructionsRenderer: Component<Props> = (props) => {
  return (
    <section class="mt-8">
      <h2 class="mb-2 text-xl font-bold text-slate-900">Instructions</h2>

      <Show
        when={parseInstructions(props.instructions).length}
        fallback={<p>This recipe does not have any instructions, yet.</p>}
      >
        <ol>
          <Index each={parseInstructions(props.instructions)}>
            {(instruction) => (
              <li>
                <Switch>
                  <Match when={instruction().type === "heading"}>
                    <h4 class="mb-4 text-lg font-bold text-slate-900">{instruction().content}</h4>
                  </Match>

                  <Match when={instruction().type === "paragraph"}>
                    <p innerHTML={instruction().content} class="mb-4" />
                  </Match>
                </Switch>
              </li>
            )}
          </Index>
        </ol>
      </Show>
    </section>
  );
};

export default InstructionsRenderer;
