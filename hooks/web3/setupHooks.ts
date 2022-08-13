import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { Web3Dependancies } from "../../types/hooks";

export interface Web3Hooks {
  useAccount: UseAccountHook;
}

export interface SetupHooks {
  (deps: Web3Dependancies): Web3Hooks;
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
  };
};
