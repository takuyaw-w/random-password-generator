import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      class="w-full rounded px-4 py-3 border(gray-600 1) bg-gray-900 text-white disabled:cursor-not-allowed"
    />
  );
}
