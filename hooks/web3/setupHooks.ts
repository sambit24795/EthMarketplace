import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";
import {
  hookFactory as createListedItemsHook,
  UseListedItemHook,
} from "./useListedItems";
import {
  hookFactory as createOwneditemsHook,
  UseOwnedItemHook,
} from "./useOwnedItems";
import { Web3Dependancies } from "../../types/hooks";

export interface Web3Hooks {
  useAccount: UseAccountHook;
  useNetwork: UseNetworkHook;
  useListedItems: UseListedItemHook;
  useOwnedItems: UseOwnedItemHook;
}

export interface SetupHooks {
  (deps: Web3Dependancies): Web3Hooks;
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps),
    useListedItems: createListedItemsHook(deps),
    useOwnedItems: createOwneditemsHook(deps),
  };
};
