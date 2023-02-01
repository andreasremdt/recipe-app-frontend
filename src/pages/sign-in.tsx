import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import AuthLayout from "../layouts/auth";
import Button from "../primitives/button";
import Input from "../primitives/input";
import Label from "../primitives/label";
import Link from "../primitives/link";
import Checkbox from "../primitives/checkbox";

const SignIn: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const response = await fetch("http://localhost:3000/api/auth/sign-in", {
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
        <h1 class="mb-1 text-3xl font-bold text-slate-900">Sign in to your account</h1>
        <p>
          or <Link href="/sign-up">sign up for a free account</Link>
        </p>
      </header>

      <form class="mt-8 rounded-md bg-white p-8 drop-shadow" onSubmit={handleSubmit}>
        <Label for="email">Email address</Label>
        <Input type="email" id="email" name="email" required />

        <Label for="password">Password</Label>
        <Input type="password" id="password" name="password" required />

        <div class="mb-4 flex items-center justify-between">
          <Checkbox>Remember me</Checkbox>

          <Link href="/forgot-password">Forgot your password?</Link>
        </div>

        <Button type="submit">Sign in</Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
