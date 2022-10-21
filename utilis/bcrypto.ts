import { hash as hashPromise, hashSync } from "bcrypt";
import { cryptoRandomString } from "crypto_random_string";

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

export type GeneratedPasswd = {
  password: string;
  hash: string;
};

const hash: typeof hashPromise = (
  plaintext: string,
  salt: string | undefined = undefined,
) => new Promise((res) => res(hashSync(plaintext, salt)));

export async function generatePassword(
  quantity: number,
  options: GenerateOptions,
): Promise<GeneratedPasswd[]> {
  return await Promise.all([...Array(quantity)].map(async () => {
    const s = cryptoRandomString(options);
    const h = await hash(s);
    return {
      password: s,
      hash: h,
    };
  }));
}
