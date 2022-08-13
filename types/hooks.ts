import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers, Contract } from "ethers";
import { SWRResponse } from "swr";

export interface Web3Dependancies {
  provider: providers.Web3Provider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
  isLoading: boolean;
}

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;

export type CryptoHandlerHook<D = any, R = any> = () => CryptoSWRResponse<D, R>;

export interface CryptoHookFactory<D = any, R = any> {
  (deps: Partial<Web3Dependancies>): CryptoHandlerHook<D, R>;
}
