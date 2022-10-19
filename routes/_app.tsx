import type { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <div class="h-screen bg-gray-200">
        <Header />
        <main class="mt-6 mx-auto container">
          <Component />
        </main>
      </div>
    </>
  );
}
