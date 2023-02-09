import type { Component, JSX } from "solid-js";

import cx from "../lib/classnames";

const Button: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const base =
    "h-10 w-full rounded-md bg-indigo-600 text-white outline-none hover:bg-indigo-700 focus:bg-indigo-700 focus:ring-2 focus:ring-indigo-200 transition-colors";

  return <button classList={cx(base, props)} {...props} />;
};

export default Button;
