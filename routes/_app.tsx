import type { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
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
