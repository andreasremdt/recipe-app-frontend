import { Title } from "@solidjs/meta";
import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import AuthLayout from "../layouts/auth";
import Button from "../primitives/button";
import Input from "../primitives/input";
import Label from "../primitives/label";
import Link from "../primitives/link";
import Checkbox from "../primitives/checkbox";
// import useForm from "../hooks/use-form";

const SignUp: Component = () => {
  const navigate = useNavigate();
  // const { register } = useForm();

  // const handleBlur = (event) => {
  //   console.log(event.target.checkValidity());
  //   console.log(event.target.validationMessage);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("jwt-token", data.token);
      navigate("/");
    }
  };

  return (
    <AuthLayout>
      <Title>Sign in</Title>

      <header class="text-center">
        <h1 class="mb-1 text-3xl font-bold text-slate-900">Sign up for a new account</h1>
        <p>
          or <Link href="/sign-in">sign in if you already have an account</Link>
        </p>
      </header>

      <form class="mt-8 rounded-md bg-white p-8 drop-shadow" onSubmit={handleSubmit}>
        <Label for="name" optional>
          First and last name
        </Label>
        <Input type="text" id="name" name="name" />

        <Label for="email">Email address</Label>
        <Input type="email" id="email" name="email" required />

        <Label for="password">Password</Label>
        <Input type="password" id="password" name="password" required />

        <Label for="repeat-password">Repeat password</Label>
        <Input type="password" id="repeat-password" required />

        <div class="mb-4">
          <Checkbox>Remember me</Checkbox>
        </div>

        <Button type="submit">Sign up</Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
