import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";

import AuthLayout from "../layouts/auth";
import Button from "../primitives/button";
import Input from "../primitives/input";
import Label from "../primitives/label";
import Link from "../primitives/link";
import Checkbox from "../primitives/checkbox";

const SignUp: Component = () => {
  return (
    <AuthLayout>
      <Title>Sign in</Title>

      <header class="text-center">
        <h1 class="mb-1 text-3xl font-bold text-slate-900">Sign up for a new account</h1>
        <p>
          or <Link href="/sign-in">sign in if you already have an account</Link>
        </p>
      </header>

      <form class="mt-8 rounded-md bg-white p-8 drop-shadow">
        <Label for="name" optional>
          First and last name
        </Label>
        <Input type="text" id="name" />

        <Label for="email">Email address</Label>
        <Input type="email" id="email" required />

        <Label for="password">Password</Label>
        <Input type="password" id="password" required />

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
