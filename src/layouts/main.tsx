import { A } from "@solidjs/router";
import type { Component, JSX } from "solid-js";

interface MainLayoutProps {
  children: JSX.Element;
  title: string;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  return (
    <div class="flex min-h-screen">
      <nav class="flex w-64 flex-col bg-white py-2 shadow-md">
        <A
          href="/"
          class="block px-6 py-3 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          My Recipes
        </A>
        <A
          href="/settings"
          class="block px-6 py-3 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Settings
        </A>
        <A
          href="/Discover"
          class="block px-6 py-3 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Discover
        </A>
        <A
          href="/Discover"
          class="hover:bg-ind5o-100 mt-auto block px-6 py-3 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Profile
        </A>
        <A
          href="/Discover"
          class="block px-6 py-3 font-medium text-slate-800 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
        >
          Logout
        </A>
      </nav>

      <main class="flex-1 py-4 px-8">
        <header class="mb-3 border-b border-slate-300 pb-3">
          <h1 class="text-3xl font-bold text-slate-900">{props.title}</h1>
        </header>

        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
