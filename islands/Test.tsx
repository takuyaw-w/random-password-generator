import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Generate!</Button>
      <p>{count}</p>
    </>
  );
}
