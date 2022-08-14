import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

import { Web3State } from "../../types/web3";
import { createDefaultState, loadContract, createWeb3State } from "./util";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { EthMarketContract } from "../../types/ethMarketContract";

const Web3Context = createContext<Web3State>(createDefaultState());

const pageReload = () => {
  window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked());

  if (isLocked) {
    pageReload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
};

const removeGlobalListener = (ethereum: MetaMaskInpageProvider) => {
  ethereum.removeListener("chainChanged", pageReload);
  ethereum.removeListener("accountsChanged", handleAccount(ethereum));
};

const Web3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    const initWeb = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const contract = await loadContract("EthMarket", provider);

        const signer = provider.getSigner();
        const signedContract = contract.connect(signer);

        setGlobalListeners(window.ethereum);
        setWeb3Api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract: signedContract as unknown as EthMarketContract,
            isLoading: false,
          })
        );
      } catch (error) {
        console.error(error);
        setWeb3Api((prevState) =>
          createWeb3State({ ...(prevState as any), isLoading: false })
        );
      }
    };

    initWeb();
    return () => {
      removeGlobalListener(window.ethereum);
    };
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;
