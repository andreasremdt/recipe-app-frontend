import { Recipe } from "../types/recipe";

export function transformHeadingsTo(
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  html: string
): string {
  try {
    const dom = new DOMParser().parseFromString(html, "text/html");
    const headings = dom.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      const h3 = document.createElement(level);
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
    instructions: JSON.stringify(recipe.instructions),
  };

  return JSON.stringify(transformed);
}

export function parseFromDatabase(value: string) {
  try {
    return JSON.parse(value);
  } catch (ex) {
    console.warn("Could not parse data from database:", ex);
    return value;
  }
}
