import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Signer } from "@polkadot/api/types";
import { KeyringPair } from "@polkadot/keyring/types";

export async function sendTxSignByWallet(
  address: string,
  signer: Signer,
  tx: SubmittableExtrinsic
) {
  await tx.signAndSend(address, { signer }, ({ status, txHash }) => {
    if (status.isInBlock) {
      console.log(txHash.toString());
      console.log(`Completed at block hash #${status.asInBlock.toString()}`);
    } else {
      console.log(`Current status: ${status.type}`);
    }
  });
}

export async function sendTxSignByKeyringPair(
  keyringPair: KeyringPair,
  tx: SubmittableExtrinsic
) {
  console.log('sending')
  await tx.signAndSend(keyringPair, ({ status, txHash }) => {
    if (status.isInBlock) {
      console.log(txHash.toString());
      console.log(`Completed at block hash #${status.asInBlock.toString()}`);
    } else {
      console.log(`Current status: ${status.type}`);
    }
  });
}
