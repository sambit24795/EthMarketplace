import { ethers } from "ethers";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";

const NETWORKS: { [k: string]: string } = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const TARGET_ID = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID;
const TARGET_NETWORK = NETWORKS[TARGET_ID!];

type UseNetworkResponse = {
  isLoading: boolean;
  isSupported: boolean;
  targetNetwork: string;
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? "web3/useNetwork" : null,
      async () => {
        const chainId = (await provider?.getNetwork())?.chainId;
        const accounts = await provider!.listAccounts();
        const account = accounts[0];
        const balance = ethers.utils.formatEther(
          await provider?.getBalance(account)!
        );

        if (!chainId) {
          throw new Error("Cannot get chainId");
        }

        return NETWORKS[chainId];
      },
      {
        revalidateOnFocus: false,
      }
    );

    return {
      ...swr,
      data,
      isValidating,
      targetNetwork: TARGET_NETWORK,
      isSupported: data === TARGET_NETWORK,
      isLoading: isLoading || isValidating,
    };
  };
