import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers, Contract } from "ethers";
import { SWRResponse } from "swr";

export interface Web3Dependancies {
  provider: providers.Web3Provider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
}

export type CryptoSWRResponse<D = any> = SWRResponse<D>;

export type CryptoHandlerHook<D = any, P = any> = (
  params: P
) => CryptoSWRResponse<D>;

export interface CryptoHookFactory<D = any, P = any> {
  (deps: Partial<Web3Dependancies>): CryptoHandlerHook<D, P>;
}
