# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


## 本地启动 acala 测试网

```sh
# https://github.com/AcalaNetwork/chopsticks/blob/master/configs/acala.yml
# https://github.com/AcalaNetwork/chopsticks/blob/master/configs/polkadot.yml
npx @acala-network/chopsticks@latest xcm -r ./configs/polkadot.yml -p ./configs/acala.yml
```

## evm rpc 本地启动

```sh
npx @acala-network/eth-rpc-adapter \
  --endpoint ws://localhost:9944 \
  --local-mode
```

## refs

* evm 相关工具 https://evm.acala.network/#/Bind%20Account
* 产生开发者相关账号：https://evmdocs.acala.network/tooling/development-account
* metamask 链接： https://evmdocs.acala.network/tooling/metamask/connect-to-the-network
* 部署 evm 合约：https://evmdocs.acala.network/tooling/evm-playground/deploy-smart-contracts

## TODO


### 产生可以 deploy 智能合约的账号

* [ ] [Development Account](https://evmdocs.acala.network/tooling/development-account#bind-accounts) 
* [ ] 给团队演示整个流程

### 开发部署跨链 evm 合约，前端 js 调用合约 demo
