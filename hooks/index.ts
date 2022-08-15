import { useHooks } from "../providers/web3/index";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount();
  return {
    account: swrRes,
  };
};

export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks.useNetwork();
  return {
    network: swrRes,
  };
};

export const useListeditems = () => {
  const hooks = useHooks();
  const swrRes = hooks.useListedItems();
  return {
    itemData: swrRes,
  };
};

export const useOwneditems = () => {
  const hooks = useHooks();
  const swrRes = hooks.useOwnedItems();
  return {
    ownedData: swrRes,
  };
};
