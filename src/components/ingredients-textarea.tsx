import { Component, createSignal, Match, Switch, Show } from "solid-js";
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

  return (
    <div
      classList={{
        "fixed inset-0 flex items-center justify-center bg-slate-600/40": fullScreen(),
      }}
    >
      <div
        classList={{
          "h-2/3 w-2/3 bg-white p-4 shadow-md rounded-md flex flex-col": fullScreen(),
        }}
      >
        <div class="mb-2 flex items-center gap-x-1">
          <Show when={editor()}>
            <button
              onClick={() => editor().chain().focus().toggleHeading({ level: 3 }).run()}
              class="flex h-6 w-6 items-center justify-center rounded-sm"
              classList={{
                "bg-indigo-600 hover:bg-indigo-700 text-white": editor().isActive("heading"),
                "hover:bg-slate-100": !editor().isActive("heading"),
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" fill="currentColor" />
              </svg>
            </button>
            <Switch>
              <Match when={fullScreen()}>
                <button
                  type="button"
                  title="Collapse"
                  onClick={() => setFullScreen(false)}
                  class="flex h-6 w-6 items-center justify-center rounded-sm"
                  classList={{
                    "bg-indigo-600 hover:bg-indigo-700 text-white": fullScreen(),
                    "hover:bg-slate-100": !fullScreen(),
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </Match>
              <Match when={!fullScreen()}>
                <button
                  type="button"
                  title="Expand"
                  onClick={() => setFullScreen(true)}
                  class="flex h-6 w-6 items-center justify-center rounded-sm"
                  classList={{
                    "bg-indigo-600 hover:bg-indigo-700 text-white": fullScreen(),
                    "hover:bg-slate-100": !fullScreen(),
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </Match>
            </Switch>
          </Show>
        </div>

        <EditorContent editor={editor()} class="flex-1" />
      </div>
    </div>
  );
};

export default IngredientsTextarea;
