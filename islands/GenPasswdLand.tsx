import { Button } from "../components/Button.tsx";
import { Select } from "../components/Select.tsx";
import { Table } from "../components/Table.tsx";
import { Input } from "../components/Input.tsx";
import { useState } from "preact/hooks";
import {
  type DigestType,
  generatePassword,
  type PasswordList,
} from "../utilis/bcrypto.ts";

const header = [
  {
    field: "password",
    headerName: "Password",
  },
  {
    field: "hash",
    headerName: "Hash",
  },
];

const charTypes = [
  { optionName: "hex", value: "hex", selected: false },
  { optionName: "base64", value: "base64", selected: false },
  { optionName: "url-safe", value: "url-safe", selected: false },
  { optionName: "numeric", value: "numeric", selected: false },
  {
    optionName: "distinguishable",
    value: "distinguishable",
    selected: false,
  },
  {
    optionName: "ascii-printable",
    value: "ascii-printable",
    selected: false,
  },
  { optionName: "alphanumeric", value: "alphanumeric", selected: true },
];

const hashTypes = [
  { optionName: "bcrypto", value: "bcrypto", selected: true },
  { optionName: "SHA-1", value: "SHA-1", selected: false },
  { optionName: "SHA-256", value: "SHA-256", selected: false },
  { optionName: "SHA-384", value: "SHA-384", selected: false },
  { optionName: "SHA-512", value: "SHA-512", selected: false },
];

export default function GenPasswdLand() {
  const [quantity, setQuantity] = useState(10);
  const [length, setLength] = useState(8);
  const [passwordList, setPasswordList] = useState<PasswordList[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [characterType, setCharacterType] = useState("alphanumeric");
  const [hasherType, setHasherType] = useState<DigestType>("bcrypto");

  async function submitHandler() {
    setIsProcessing((prevState) => !prevState);
    setPasswordList([]);
    const l = [];
    for await (
      const p of generatePassword(quantity, hasherType, {
        length,
        type: characterType,
      })
    ) {
      l.push(p);
    }
    setPasswordList(l);
    setIsProcessing((prevState) => !prevState);
  }

  function inputHandler(e: InputEvent): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    if (e.target.name === "quantity") {
      setQuantity(e.target.valueAsNumber);
    } else {
      setLength(e.target.valueAsNumber);
    }
  }

  function selectHandler(e: InputEvent): void {
    if (!(e.target instanceof HTMLSelectElement)) {
      return;
    }
    if (e.target.name === "charType") {
      setCharacterType(e.target.value);
    } else {
      setHasherType(e.target.value);
    }
  }

  function exportCsv(): void {
    const header = ["Password", "Hash"];
    const rows = passwordList.map((v) => [v.password, v.hash]);
    const merge = [header, ...rows];
    const data = merge.map((v) => {
      const i = v.map((v) => {
        return '"' + v + '"';
      });
      return i.join(",");
    }).join("\r\n");
    const blob = new Blob([data], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "password_list.csv";
    a.click();
    a.remove();
  }

  return (
    <>
      <div class="shadow bg-white rounded p-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Select
              options={charTypes}
              onChange={selectHandler}
              name="charType"
              id="c"
            >
              Password Type
            </Select>
          </div>
          <div>
            <Select
              options={hashTypes}
              onChange={selectHandler}
              name="hashType"
              id="h"
            >
              Hash Type
            </Select>
          </div>
          <div>
            <Input
              type="number"
              name="quantity"
              value={quantity}
              min="1"
              max="100"
              onInput={inputHandler}
              id="q"
            >
              Quantity
            </Input>
          </div>
          <div>
            <Input
              type="number"
              name="length"
              value={length}
              min="8"
              max="100"
              step="2"
              id="l"
              onInput={inputHandler}
            >
              Password Length
            </Input>
          </div>
          <div>
            <Button onClick={submitHandler}>Generate!</Button>
          </div>
          <div>
            <Button
              disabled={passwordList.length <= 0 || isProcessing}
              onClick={exportCsv}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>
      <div class="shadow bg-white rounded mt-6 p-6">
        <Table headers={header} rows={passwordList} />
      </div>
    </>
  );
}
