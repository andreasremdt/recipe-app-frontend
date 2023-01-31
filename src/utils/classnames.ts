import type { JSX } from "solid-js";

export default function cx(base: string, addon: JSX.HTMLAttributes<HTMLElement>) {
  return {
    [base]: true,
    [addon.class]: Boolean(addon.class),
  };
}
