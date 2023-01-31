import type { Component, JSX } from "solid-js";

import cx from "../utils/classnames";

const Label: Component<JSX.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  const base = "mb-1 block font-medium text-slate-800";

  return <label classList={cx(base, props)} {...props} />;
};

export default Label;
