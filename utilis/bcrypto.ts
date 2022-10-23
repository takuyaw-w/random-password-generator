import { hash as hashPromise, hashSync } from "bcrypt";
import { cryptoRandomString } from "crypto_random_string";
import { delay } from "std/async/delay.ts";
const encoder = new TextEncoder();
type GenerateOptions = {
  length: number;
  type?: CharacterType;
  characters?: string;
};

export type DigestType =
  | "bcrypto"
  | "SHA-1"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512";

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
  digestType: DigestType,
  options: GenerateOptions,
): AsyncGenerator<PasswordList> {
  for (let i = 0; i < quantity; i++) {
    const s = cryptoRandomString(options);
    const h = await digest(s, digestType);
    await delay(0);
    yield {
      password: s,
      hash: h,
    };
  }
}

async function digest(message: string, digestType: DigestType) {
  if (digestType === "bcrypto") {
    return hash(message);
  } else {
    const msgUint8 = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest(digestType, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
      "",
    );
    return hashHex;
  }
}
