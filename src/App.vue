<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { SubWallet } from "./utils/polkadot/walletWrapper";
import {
  getAlicePair,
  generateRandomKeyring,
  importFromMnemonic,
} from "./utils/crypto/keyring";
import { SubNetwork } from "./utils/polkadot/networkWrapper";
import { sendTxSignByKeyringPair, sendTxSignByWallet } from "./utils/tx";
import { acala2Polkadot, polkadot2Acala } from "./utils/tx/assetTxBuild";

const ACALA_WS_URL = "ws://127.0.0.1:8000";
const POLKADOT_WS_URL = "ws://127.0.0.1:8013";
const TEST_MNEMONIC =
  "finger walnut polar size ozone network claw prefer bring later rug juice";

const testPair = ref();
const alicePair = ref();
const acala = new SubNetwork(ACALA_WS_URL);
const polkadot = new SubNetwork(POLKADOT_WS_URL);

const subWallet = new SubWallet();
const connectStatus = reactive({
  wallet: false,
  acala: false,
  polkadot: false,
});
const accounts = ref<any[]>([]);
const selectAddress = ref("");
watch(selectAddress, (v) => console.log(v));

subWallet.connect().then(async () => {
  connectStatus.wallet = true;
  accounts.value = (await subWallet.getAccounts()) || [];
  selectAddress.value = accounts.value[0].address;

  testPair.value = importFromMnemonic(TEST_MNEMONIC);
  alicePair.value = getAlicePair();
});
acala.connect().then(() => {
  connectStatus.acala = true;
});
polkadot.connect().then(() => {
  connectStatus.polkadot = true;
});

/**
 * Send by wallet from polkadot to acala
 */
const sendByWalletSign = async () => {
  const tx = polkadot2Acala(
    polkadot.api,
    "5HeB186Y6YxwcoUvoT7kAVVnbw4ee7xxqogq11b1VtyQ6xWP",
    5e10
  );
  const signer = subWallet.extension!.signer;
  await sendTxSignByWallet(selectAddress.value, signer, tx);
};

/**
 * send by keyring pair from polkadot to acala
 */
const sendByKeyringPairFromPolkadot = async () => {
  const tx = polkadot2Acala(
    polkadot.api,
    "5HeB186Y6YxwcoUvoT7kAVVnbw4ee7xxqogq11b1VtyQ6xWP",
    5e10
  );
  await sendTxSignByKeyringPair(alicePair.value, tx);
};

/**
 * send by keyring pair from polkadot to acala
 */
const sendByKeyringPairFromAcala = async () => {
  const tx = acala2Polkadot(
    acala.api,
    "5HeB186Y6YxwcoUvoT7kAVVnbw4ee7xxqogq11b1VtyQ6xWP",
    6e10
  );
  await sendTxSignByKeyringPair(alicePair.value, tx);
};

const generateKeyring = () => {
  const res = generateRandomKeyring();
  console.log(res);
};
</script>

<template>
  <div>connecting: {{ connectStatus }}</div>
  <button @click="generateKeyring">{{ "Generate Keyring" }}</button>
  <div style="margin: 12px; padding: 12px; border: solid 1px grey">
    <div>
      <select v-model="selectAddress">
        <option v-for="account in accounts" :key="account.address">
          {{ account.address }}
        </option>
      </select>
    </div>
    <button @click="sendByWalletSign">{{ "Send by Wallet" }}</button>
  </div>
  <div>
    <button @click="sendByKeyringPairFromAcala">{{ "Send from acala" }}</button>
    <button @click="sendByKeyringPairFromPolkadot">
      {{ "Send from polkadot" }}
    </button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
