import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";
import { Web3Dependancies } from "../../types/hooks";

export interface Web3Hooks {
  useAccount: UseAccountHook;
  useNetwork: UseNetworkHook;
}

export interface SetupHooks {
  (deps: Web3Dependancies): Web3Hooks;
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps)
  };
};
