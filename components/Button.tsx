import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-full rounded px-4 py-3 border(gray-600 1) bg-gray-900 text-white disabled:cursor-not-allowed"
    />
  );
}
