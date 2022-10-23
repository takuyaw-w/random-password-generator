import { Button } from "../components/Button.tsx";
import { Table } from "../components/Table.tsx";
import { Input } from "../components/Input.tsx";
import { useState } from "preact/hooks";
import { generatePassword, type PasswordList } from "../utilis/bcrypto.ts";

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

export default function GenPasswdLand() {
  const [quantity, setQuantity] = useState(10);
  const [length, setLength] = useState(8);
  const [passwordList, setPasswordList] = useState<PasswordList[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  async function submitHandler(e: SubmitEvent) {
    e.preventDefault();
    setIsProcessing((prevState) => !prevState);

    setPasswordList([]);
    const l = [];
    for await (
      const p of generatePassword(quantity, {
        length,
        type: "alphanumeric",
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

  return (
    <>
      <div class="shadow bg-white rounded mt-6 p-6">
        <form onSubmit={submitHandler}>
          <fieldset class="grid grid-cols-2 gap-4" disabled={isProcessing}>
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
            <div class="col-span-2">
              <Button>Generate!</Button>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="shadow bg-white rounded mt-6 p-6">
        <Table headers={header} rows={passwordList} />
      </div>
    </>
  );
}
