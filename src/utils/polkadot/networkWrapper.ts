import { ApiPromise, WsProvider } from "@polkadot/api";
export class SubNetwork {
  api: ApiPromise;
  constructor(wsUrl: string) {
    this.api = new ApiPromise({
      provider: new WsProvider(wsUrl),
    });
  }

  async connect() {
    await this.api.isReady;
  }
}

