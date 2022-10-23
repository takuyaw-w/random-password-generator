import type { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Random Password Generator</title>
        <meta property="og:title" content="Random Password Generator" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Generate a random password." />
        <meta property="og:url" content="https://random-passwd-gen.deno.dev/" />
        <meta property="og:site_name" content="Random Password Generator" />
        <meta
          property="og:image"
          content="https://random-passwd-gen.deno.dev/ogp.png"
        />
        <meta name="twitter:card" content="summary" />
      </Head>
      <div class="flex flex-col min-h-screen bg-gray-200">
        <Header />
        <main class="my-6 mx-auto container flex-grow">
          <Component />
        </main>
        <Footer />
      </div>
    </>
  );
}
