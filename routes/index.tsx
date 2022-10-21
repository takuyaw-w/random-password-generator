import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { generatePassword } from "../utilis/bcrypto.ts";
import { type GeneratedPasswd } from "../utilis/bcrypto.ts";
import { Button } from "../components/Button.tsx";
import { Table } from "../components/Table.tsx";

type Data = {
  generatedPass: GeneratedPasswd[];
  query: any;
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const generatedPass: GeneratedPasswd[] = await generatePassword(Number(q), {
      length: 8,
      type: "alphanumeric",
    });
    return ctx.render({ generatedPass });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { generatedPass } = data;
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
  return (
    <>
      <Head>
        <title>Random Password Generator</title>
      </Head>
      <form>
        <input type="hidden" min="1" max="100" name="q" value="10" />
        <Button type="submit">Generate!</Button>
      </form>
      <div class="shadow bg-white rounded mt-6 p-6">
        <Table headers={header} rows={generatedPass} />
      </div>
    </>
  );
}
