import type { Component } from "solid-js";
import { A, AnchorProps } from "@solidjs/router";

import cx from "../lib/classnames";

const Link: Component<AnchorProps> = (props) => {
  const base = "text-indigo-600 hover:underline outline-none focus:underline";

  return <A classList={cx(base, props)} {...props} />;
};

export default Link;
