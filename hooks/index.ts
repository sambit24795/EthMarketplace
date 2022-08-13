import { useHooks } from "../providers/web3/index";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount("");
  return {
    account: swrRes,
  };
};
