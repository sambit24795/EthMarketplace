import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers } from "ethers";
import { SWRResponse } from "swr";
import { EthMarketContract } from "./ethMarketContract";

export interface Web3Dependancies {
  provider: providers.Web3Provider;
  contract: EthMarketContract;
  ethereum: MetaMaskInpageProvider;
  isLoading: boolean;
}

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;

export type CryptoHandlerHook<D = any, R = any> = () => CryptoSWRResponse<D, R>;

export interface CryptoHookFactory<D = any, R = any> {
  (deps: Partial<Web3Dependancies>): CryptoHandlerHook<D, R>;
}
