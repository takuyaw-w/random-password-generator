import { hash as hashPromise, hashSync } from "bcrypt";
import { cryptoRandomString } from "crypto_random_string";
import { delay } from "https://deno.land/std@0.160.0/async/delay.ts";
type GenerateOptions = {
  length: number;
  type?: CharacterType;
  characters?: string;
};

type CharacterType =
  | "hex"
  | "base64"
  | "url-safe"
  | "numeric"
  | "distinguishable"
  | "ascii-printable"
  | "alphanumeric";

export type PasswordList = {
  password: string;
  hash: string;
};

const hash: typeof hashPromise = (
  plaintext: string,
  salt: string | undefined = undefined,
) => new Promise((res) => res(hashSync(plaintext, salt)));

export async function* generatePassword(
  quantity: number,
  options: GenerateOptions,
): AsyncGenerator<PasswordList> {
  for (let i = 0; i < quantity; i++) {
    const s = cryptoRandomString(options);
    const h = await hash(s);
    await delay(0);
    yield {
      password: s,
      hash: h,
    };
  }
}
