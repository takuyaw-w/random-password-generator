import { JSX } from "preact";

type Props = {
  options: Option[];
};

type Option = {
  optionName: string;
  value: string | number;
  selected: boolean;
};

export function Select(_props: JSX.HTMLAttributes<HTMLSelectElement> & Props) {
  const { options, label, ...props } = _props;
  return (
    <>
      <label class="block text-sm text-gray-600" for={props.id}>
        {label}
      </label>
      <select
        class="min-w-full p-2 bg-white border(gray-500 1) shadow rounded disabled:bg-gray-50"
        {...props}
      >
        {options.map((v) => (
          <option value={v.value} selected={v.selected}>{v.optionName}</option>
        ))}
      </select>
    </>
  );
}
