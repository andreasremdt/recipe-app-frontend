import { Component, JSX, splitProps } from "solid-js";

import cx from "../lib/classnames";

const Checkbox: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [local, rest] = splitProps(props, ["children"]);

  const base =
    "block h-4 w-4 appearance-none rounded-sm border border-slate-300 text-white shadow-sm outline-none transition-colors checked:border-indigo-600 checked:bg-indigo-600 hover:border-indigo-600 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";

  return (
    <label class="flex cursor-pointer items-center gap-x-2">
      <input type="checkbox" classList={cx(base, props)} {...rest} />
      {local.children}
    </label>
  );
};

export default Checkbox;
