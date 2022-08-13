import { ethers } from "ethers";
import { useEffect } from "react";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<
  { address: string; balance: string },
  UseAccountResponse
>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];
        const balance = ethers.utils.formatEther(
          await provider?.getBalance(account)!
        );

        if (!account) {
          throw new Error("Cannot get account connected to web3 wallet");
        }

        return { address: account, balance };
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    );

    useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    });

    const handleAccountsChanged = async (...args: unknown[]) => {
      const accounts = args[0] as Array<string>;
      if (!accounts.length) {
        console.error("Connect to metamask");
      } else if (accounts[0] !== data?.address) {
        const balance = ethers.utils.formatEther(
          await provider?.getBalance(accounts[0])!
        );
        mutate({ address: accounts[0], balance });
      }
    };

    const connect = async () => {
      try {
        ethereum?.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      ...swr,
      data,
      isValidating,
      isLoading: !!isLoading,
      isInstalled: !!ethereum?.isMetaMask,
      mutate,
      connect,
    };
  };
