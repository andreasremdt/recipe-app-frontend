import { Component, createSignal, Match, Switch, Show, onCleanup } from "solid-js";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { JSONContent } from "@tiptap/core";
import { createEditor, EditorContent } from "tiptap-solid";

import { transformPastedHTML } from "../lib/utils";

interface Props {
  value?: JSONContent;
  onInput: (value: JSONContent) => void;
}

const IngredientsTextarea: Component<Props> = (props) => {
  const [fullScreen, setFullScreen] = createSignal(false);
  const editor = createEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [3],
        HTMLAttributes: { class: "font-semibold text-slate-900" },
      }),
    ],
    content: props.value,
    onUpdate({ editor }) {
      props.onInput(editor.getJSON());
    },
    editorProps: {
      transformPastedHTML,
    },
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && fullScreen()) {
      setFullScreen(false);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  onCleanup(() => document.removeEventListener("keydown", handleKeyDown));

  return (
    <>
      <Show when={fullScreen()}>
        <div class="fixed inset-0 z-10 bg-slate-600/20 backdrop-blur-md" aria-hidden="true" />
      </Show>
      <div
        classList={{
          "fixed inset-0 flex items-center justify-center z-20": fullScreen(),
        }}
      >
        <div
          classList={{
            "h-2/3 w-2/3 rounded-md flex flex-col": fullScreen(),
          }}
        >
          <Show when={editor()}>
            <div class="flex items-center justify-between gap-x-1 rounded-t-md border border-b-0 border-slate-300 bg-white p-1">
              <button
                onClick={() => editor().chain().focus().toggleHeading({ level: 3 }).run()}
                class="flex h-6 items-center justify-center gap-x-1 rounded-sm px-1 text-xs  font-medium uppercase tracking-wide text-slate-900"
                classList={{
                  "bg-slate-200 hover:bg-slate-300": editor().isActive("heading"),
                  "hover:bg-slate-100": !editor().isActive("heading"),
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" fill="currentColor" />
                </svg>
                Heading
              </button>

              <button
                type="button"
                onClick={() => setFullScreen((fullScreen) => !fullScreen)}
                class="flex h-6 items-center justify-center gap-x-1 rounded-sm px-1 text-xs  font-medium uppercase tracking-wide text-slate-900 hover:bg-slate-100"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <Switch>
                    <Match when={fullScreen()}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"
                        fill="currentColor"
                      />
                    </Match>
                    <Match when={!fullScreen()}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"
                        fill="currentColor"
                      />
                    </Match>
                  </Switch>
                </svg>
                Fullscreen
              </button>
            </div>
          </Show>

          <EditorContent
            editor={editor()}
            class="flex-1"
            classList={{ "is-small": !fullScreen() }}
          />
        </div>
      </div>
    </>
  );
};

export default IngredientsTextarea;
