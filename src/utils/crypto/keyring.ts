import { Keyring } from "@polkadot/api";
import { mnemonicGenerate } from "@polkadot/util-crypto";

export const generateRandomKeyring = () => {
  const mnemonic = mnemonicGenerate();
  const keyring = new Keyring({
    type: "sr25519",
    ss58Format: /** acala: 10 */ 10,
  });
  const pair = keyring.addFromUri(mnemonic);
  return {
    mnemonic,
    pair,
  };
};

export const importFromMnemonic = (mnemonic: string) => {
  const keyring = new Keyring({
    type: "sr25519",
    ss58Format: /** acala: 10 */ 10,
  });
  const pair = keyring.addFromUri(mnemonic);
  console.log("import Mnemonic", pair);
  return pair;
};

export const getAlicePair = () => {
  const keyring = new Keyring({
    type: "sr25519",
    ss58Format: /** acala: 10 */ 10,
  });
  const pair = keyring.addFromUri("//Alice");
  return pair;
};
