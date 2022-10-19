import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { cryptoRandomString } from "crypto_random_string";
import { hash, hashSync } from "bcrypt";
import ky from "https://cdn.skypack.dev/ky?dts";
import { delay } from "https://deno.land/std@0.160.0/async/delay.ts";

type Hoge = {
  password: string;
  hash: string;
};

export default function Test() {
  const [list, setList] = useState<Hoge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  async function* genPass(): AsyncGenerator<Hoge> {
    for (const i of [...Array(20)]) {
      const s = cryptoRandomString({ length: 8, type: "alphanumeric" });
      const h = hashSync(s);
      await delay(0);
      yield {
        password: s,
        hash: h,
      };
    }
  }

  async function addList() {
    setIsLoading(true);
    setList([]);
    const p = [];
    for await (const d of genPass()) {
      p.push(d);
      setCount(p.length);
    }
    setList(p);
    setIsLoading(false);
  }
  async function hoge() {
    const d = await ky.post("/api/joke?aa=21", {
      headers: {
        "content-type": "application/json",
      },
      json: {
        list,
      },
    }).json();
  }
  return (
    <>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <Button disabled={isLoading} onClick={addList}>
            Generate!
          </Button>
        </div>
        <div class="col-span-12 shadow bg-gray-50 rounded-xl p-6">
          <ViewTable count={count} isLoading={isLoading} data={list} />
        </div>
      </div>
    </>
  );
}

type ViewTableProps = {
  data: Hoge[];
  isLoading: boolean;
  count: number;
};

function ViewTable(props: ViewTableProps) {
  return (
    <>
      <table class="table-auto text-center w-full">
        <thead class="bg-gray-800">
          <tr>
            <th class="px-6 py-4 text-white">Password</th>
            <th class="px-6 py-4 text-white">Hash</th>
          </tr>
        </thead>
        <tbody>
          <DataCell
            count={props.count}
            isLoading={props.isLoading}
            value={props.data}
          />
        </tbody>
      </table>
    </>
  );
}

type DataCellProps = {
  value: any[];
  isLoading: boolean;
  count: number;
};
function DataCell(props: DataCellProps): VNode | VNode[] {
  const percentage = Math.floor(props.count / 20 * 100);
  if (props.value.length === 0 && !props.isLoading) {
    return (
      <tr class="border-b border-gray-200">
        <td class="p-6" colSpan={2}>Empty Data...</td>
      </tr>
    );
  } else if (props.isLoading) {
    return (
      <tr class="border-b border-gray-200">
        <td class="p-6" colSpan={2}>
          processing... {percentage}%
        </td>
      </tr>
    );
  } else {
    return props.value.map((v, i) => {
      return (
        <tr
          class={i % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}
        >
          <td class="py-6">{v.password}</td>
          <td class="py-6">{v.hash}</td>
        </tr>
      );
    });
  }
}
