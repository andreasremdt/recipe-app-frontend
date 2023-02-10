import { Recipe } from "../types/recipe";

export function transformPastedHTML(html: string): string {
  try {
    const dom = new DOMParser().parseFromString(html, "text/html");
    const headings = dom.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      const h3 = document.createElement("h3");
      h3.textContent = heading.textContent;

      heading.replaceWith(h3);
    });

    return new XMLSerializer().serializeToString(dom);
  } catch (ex) {
    console.warn("Could not transform HTML:", ex);
    return html;
  }
}

export function transformRecipeForUpdate(recipe: Recipe): string {
  const transformed = {
    title: recipe.title,
    description: recipe.description,
    ingredients: JSON.stringify(recipe.ingredients),
    instructions: recipe.instructions,
  };

  return JSON.stringify(transformed);
}
