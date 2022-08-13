import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";

type AccountHookFactory = CryptoHookFactory<string, string>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: CryptoHookFactory = (deps: any) => (params: any) => {
  const swrRes = useSWR("web3/useAccount", () => {
    return "Test user";
  });
  return swrRes;
};
