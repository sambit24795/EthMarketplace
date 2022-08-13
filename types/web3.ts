import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers, Contract } from "ethers";
import { Web3Hooks } from "../hooks/web3/setupHooks";
import { Web3Dependancies } from "./hooks";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Web3State = {
  isLoading: boolean;
  hooks: Web3Hooks;
} & Nullable<Web3Dependancies>;
