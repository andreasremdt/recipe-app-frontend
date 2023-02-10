import { Component, Resource, Setter } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import Input from "../primitives/input";
import Label from "../primitives/label";
import Textarea from "../primitives/textarea";
import Button from "../primitives/button";
import IngredientsTextarea from "./ingredients-textarea";
import type { Recipe } from "../types/recipe";
import { create, update } from "../lib/recipe-fetcher";

interface RecipeEditorProps {
  recipe: Resource<Recipe>;
  onSave: Setter<Recipe>;
}

const RecipeEditor: Component<RecipeEditorProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (event, property) => {
    props.onSave({ ...props.recipe(), [property]: event.currentTarget.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (params.id === "new") {
      const created = await create(props.recipe());

      navigate(`/recipes/${created.id}`);
    } else {
      await update(props.recipe());
    }
  };

  return (
    <form class="w-1/3 bg-white px-6 py-6 shadow-md" onSubmit={handleSubmit}>
      <Label for="title">Recipe name</Label>
      <Input
        id="title"
        name="title"
        type="text"
        required
        value={props.recipe().title}
        onInput={(event) => handleChange(event, "title")}
      />

      <Label for="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={props.recipe().description}
        onInput={(event) => handleChange(event, "description")}
        class="h-18"
      />

      <Label for="ingredients">Ingredients</Label>
      <IngredientsTextarea
        value={props.recipe().ingredients}
        onInput={(ingredients) => props.onSave({ ...props.recipe(), ingredients })}
      />

      <Label for="instructions">Instructions</Label>
      <Textarea
        id="instructions"
        name="instructions"
        value={props.recipe().instructions}
        onInput={(event) => handleChange(event, "instructions")}
        class="h-32"
      />

      <Button type="submit">Save recipe</Button>
    </form>
  );
};

export default RecipeEditor;
