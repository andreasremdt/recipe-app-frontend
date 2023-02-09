import { A } from "@solidjs/router";
import { Component, JSX, splitProps } from "solid-js";

import cx from "../lib/classnames";

interface MainLayoutProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  title: string;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  const [_, rest] = splitProps(props, ["class"]);

  return (
    <div class="flex min-h-screen flex-col">
      <nav class="flex bg-white py-1 px-2 shadow-md">
        <A
          href="/"
          class="block rounded-md px-4 py-2 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          My Recipes
        </A>
        <A
          href="/settings"
          class="block rounded-md px-4 py-2 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Settings
        </A>
        <A
          href="/Discover"
          class="block rounded-md px-4 py-2 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Discover
        </A>
        <A
          href="/Discover"
          class="hover:bg-ind5o-100 ml-auto block rounded-md px-4 py-2 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Profile
        </A>
        <A
          href="/Discover"
          class="block rounded-md px-4 py-2 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Logout
        </A>
      </nav>

      <main {...rest} classList={cx("flex-1", props)} />
    </div>
  );
};

export default MainLayout;
