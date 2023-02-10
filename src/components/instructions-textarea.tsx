import { Component, createSignal, Match, Switch, Show, onCleanup } from "solid-js";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import { JSONContent } from "@tiptap/core";
import { createEditor, EditorContent } from "tiptap-solid";

import { transformHeadingsTo } from "../lib/utils";

interface Props {
  value?: JSONContent;
  onInput: (value: JSONContent) => void;
}

const InstructionsTextarea: Component<Props> = (props) => {
  const [fullScreen, setFullScreen] = createSignal(false);
  const editor = createEditor({
    extensions: [
      Document,
      Paragraph,
      Underline,
      Bold,
      Italic,
      Text,
      Heading.configure({
        levels: [4],
        HTMLAttributes: { class: "font-semibold text-slate-900" },
      }),
    ],
    content: props.value,
    onUpdate: ({ editor }) => props.onInput(editor.getJSON()),
    editorProps: {
      transformPastedHTML: (html) => transformHeadingsTo("h4", html),
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
            <div class="flex items-center gap-x-1 rounded-t-md border border-b-0 border-slate-300 bg-white p-1">
              <button
                type="button"
                onClick={() => editor().chain().focus().toggleHeading({ level: 4 }).run()}
                class="flex h-6 items-center justify-center rounded-sm px-1 text-slate-900"
                classList={{
                  "bg-slate-200 hover:bg-slate-300": editor().isActive("heading"),
                  "hover:bg-slate-100": !editor().isActive("heading"),
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" fill="currentColor" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => editor().chain().focus().toggleBold().run()}
                class="flex h-6 items-center justify-center rounded-sm px-1 text-slate-900"
                classList={{
                  "bg-slate-200 hover:bg-slate-300": editor().isActive("bold"),
                  "hover:bg-slate-100": !editor().isActive("bold"),
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => editor().chain().focus().toggleItalic().run()}
                class="flex h-6 items-center justify-center rounded-sm px-1 text-slate-900"
                classList={{
                  "bg-slate-200 hover:bg-slate-300": editor().isActive("italic"),
                  "hover:bg-slate-100": !editor().isActive("italic"),
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => editor().chain().focus().toggleUnderline().run()}
                class="flex h-6 items-center justify-center rounded-sm px-1 text-slate-900"
                classList={{
                  "bg-slate-200 hover:bg-slate-300": editor().isActive("underline"),
                  "hover:bg-slate-100": !editor().isActive("underline"),
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setFullScreen((fullScreen) => !fullScreen)}
                class="ml-auto flex h-6 items-center justify-center rounded-sm px-1 text-slate-900 hover:bg-slate-100"
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

export default InstructionsTextarea;
