import type { Component, JSX } from "solid-js";

import cx from "../utils/classnames";

const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const base =
    "border-slate-300 border w-full rounded-md shadow-sm h-10 px-2 mb-4 outline-none hover:border-indigo-600 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors";

  return <input classList={cx(base, props)} {...props} />;
};

export default Input;
