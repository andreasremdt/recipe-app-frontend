import { generateHTML, JSONContent } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";

interface Node {
  type: string;
  content: string;
}

function findHeading(node: JSONContent, json: JSONContent): JSONContent | null {
  const index = json.content.indexOf(node);
  let heading: JSONContent = null;

  for (let i = index; i >= 0; i--) {
    if (json.content[i].type === "heading") {
      heading = json.content[i];
      break;
    }
  }

  return heading;
}

function getTextContent(node: JSONContent): string {
  return generateHTML(node, [Document, Paragraph, Text, Heading]);
}

function transformNode(node: JSONContent): Node {
  return {
    type: node.type,
    content: getTextContent(node),
  };
}

function hasContent(node: JSONContent): boolean {
  if (!node.content) {
    return false;
  }

  return getTextContent(node).trim().length > 0;
}

export default function parseIngredients(value?: JSONContent) {
  if (!value || !value.content) {
    return [];
  }

  const categorized = new Map<JSONContent, Node[]>();
  const uncategorized = new Set<Node>();

  for (const entry of value.content) {
    if (hasContent(entry)) {
      if (entry.type === "heading" && !categorized.has(entry)) {
        categorized.set(entry, []);
      } else if (entry.type === "paragraph") {
        const heading = findHeading(entry, value);

        if (heading) {
          categorized.get(heading).push(transformNode(entry));
        } else {
          uncategorized.add(transformNode(entry));
        }
      }
    }
  }

  const results = Array.from(categorized).map(([heading, children]) => ({
    ...transformNode(heading),
    children,
  }));

  if (uncategorized.size > 0) {
    results.push({
      type: "heading",
      content: null,
      children: Array.from(uncategorized),
    });
  }

  return results;
}
