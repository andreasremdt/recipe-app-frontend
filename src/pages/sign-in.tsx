import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";

import AuthLayout from "../layouts/auth";
import Button from "../primitives/button";
import Input from "../primitives/input";
import Label from "../primitives/label";
import Link from "../primitives/link";
import Checkbox from "../primitives/checkbox";

const SignIn: Component = () => {
  return (
    <AuthLayout>
      <Title>Sign in</Title>

      <header class="text-center">
        <h1 class="mb-1 text-3xl font-bold text-slate-900">Sign in to your account</h1>
        <p>
          or <Link href="/sign-up">sign up for a free account</Link>
        </p>
      </header>

      <form class="mt-8 rounded-md bg-white p-8 drop-shadow">
        <Label for="email">Email address</Label>
        <Input type="email" id="email" required />

        <Label for="password">Password</Label>
        <Input type="password" id="password" required />

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
