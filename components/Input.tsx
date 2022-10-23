import { JSX } from "https://esm.sh/v95/preact@10.11.0/jsx-runtime/src/index.d.ts";

import { JSX } from "preact";

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label class="block text-sm text-gray-600" for={props.id}>
        {props.children}
      </label>
      <input
        id={props.id}
        {...props}
        class="min-w-full rounded shadow focus:shadow-none p-2 border(gray-500 1) disabled:bg-gray-50"
      />
    </>
  );
}
