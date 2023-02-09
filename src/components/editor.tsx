import { Component, Resource, Setter } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import Input from "../primitives/input";
import Label from "../primitives/label";
import Textarea from "../primitives/textarea";
import Button from "../primitives/button";
import stringifyFormData from "../lib/stringify-form-data";
import fetcher from "../lib/fetcher";
import type { Recipe } from "../types/recipe";

interface EditorProps {
  recipe: Resource<Recipe>;
  onSave: Setter<Recipe>;
}

const Editor: Component<EditorProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (event, property) => {
    props.onSave({ ...props.recipe(), [property]: event.currentTarget.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = stringifyFormData(new FormData(event.target));

    if (params.id === "new") {
      const recipe = await fetcher<Recipe>("POST", "/api/recipes", formData);

      navigate(`/recipes/${recipe.id}`);
    } else {
      await fetcher<Recipe>("PATCH", `/api/recipes/${props.recipe().id}`, formData);
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
        class="h-12"
      />

      <Label for="ingredients">Ingredients</Label>
      <Textarea
        id="ingredients"
        name="ingredients"
        value={props.recipe().ingredients}
        onInput={(event) => handleChange(event, "ingredients")}
        rows={10}
      />

      <Label for="instructions">Instructions</Label>
      <Textarea
        id="instructions"
        name="instructions"
        value={props.recipe().instructions}
        onInput={(event) => handleChange(event, "instructions")}
        rows={10}
      />

      <Button type="submit">Save recipe</Button>
    </form>
  );
};

export default Editor;
