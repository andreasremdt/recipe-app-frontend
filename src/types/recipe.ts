import type { JSONContent } from "@tiptap/core";

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients?: JSONContent;
  instructions?: JSONContent;
  thumbnailUrl?: string;
}
