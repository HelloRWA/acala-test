import { ApiPromise } from "@polkadot/api";
import { decodeAddress } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
export const acala2Polkadot = (
  api: ApiPromise,
  dest: string,
  amount: number | string | bigint
) => {
  const token = { Token: "DOT" };
  const dest32 = u8aToHex(decodeAddress(dest));
  const destCfg = {
    V3: {
      parents: 1,
      interior: {
        X1: {
          AccountId32: {
            id: dest32,
          },
        },
      },
    },
  };
  const weight = "Unlimited";

  return api.tx.xTokens.transfer(token, amount, destCfg, weight);
};

export const polkadot2Acala = (
  api: ApiPromise,
  dest: string,
  amount: number | string | bigint
) => {
  const destChainCfg = {
    V3: {
      parents: 0,
      interior: {
        X1: { Parachain: 2000 /** acala paraId */ },
      },
    },
  };
  const dest32 = u8aToHex(decodeAddress(dest));
  const destCfg = {
    V3: {
      parents: 0,
      interior: {
        X1: {
          AccountId32: {
            id: dest32,
          },
        },
      },
    },
  };
  const asset = {
    V3: [
      {
        id: { Concrete: { parents: 0, interior: "Here" } },
        fun: { Fungible: amount },
      },
    ],
  };
  const weightLimit = "Unlimited";

  return api.tx.xcmPallet.limitedReserveTransferAssets(
    destChainCfg,
    destCfg,
    asset,
    0,
    weightLimit
  );
};
