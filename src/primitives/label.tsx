import { Component, JSX, splitProps } from "solid-js";

import cx from "../lib/classnames";

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
}

const Label: Component<LabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["children", "optional"]);
  const base = "mb-1 block font-medium text-slate-800";

  return (
    <label classList={cx(base, props)} {...rest}>
      {local.children}{" "}
      {local.optional && (
        <span class="ml-0.5 text-xs font-normal uppercase text-slate-400">(optional)</span>
      )}
    </label>
  );
};

export default Label;
