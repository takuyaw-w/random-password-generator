import { JSX } from "preact";

export function Input(_props: JSX.HTMLAttributes<HTMLInputElement>) {
  const { label, ...props } = _props;
  return (
    <>
      <label class="block text-sm text-gray-600" for={props.id}>
        {label}
      </label>
      <input
        {...props}
        class="min-w-full rounded shadow focus:shadow-none p-2 border(gray-500 1) disabled:bg-gray-50"
      />
    </>
  );
}
