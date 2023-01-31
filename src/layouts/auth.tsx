import type { Component, JSX } from "solid-js";

interface AuthLayoutProps {
  children: JSX.Element;
}

const AuthLayout: Component<AuthLayoutProps> = (props) => {
  return (
    <main class="grid min-h-screen place-items-center">
      <div class="w-full max-w-md">{props.children}</div>
    </main>
  );
};

export default AuthLayout;
