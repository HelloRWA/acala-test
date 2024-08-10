import { Injected } from "@polkadot/extension-inject/types";

export class SubWallet {
  extension: Injected | null;
  constructor() {
    this.extension = null;
  }

  async connect() {
    const SubWalletExtension = (window as any).injectedWeb3?.["subwallet-js"];
    if (!SubWalletExtension) {
      alert("SubWallet extension not found");
      throw new Error("SubWallet extension not found");
    }
    const extension = (await SubWalletExtension.enable()) as Injected;
    this.extension = extension;
  }

  async getAccounts() {
    const res = await this.extension?.accounts.get();
    console.log(res);
    return res;
  }
}
