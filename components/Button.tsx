import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-full shadow rounded px-4 py-3 text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-500"
    />
  );
}
