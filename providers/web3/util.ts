import { providers, Contract, ethers } from "ethers";
import { Web3State } from "../../types/web3";
import { setupHooks } from "../../hooks/web3/setupHooks";
import { Web3Dependancies } from '../../types/hooks';

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const createDefaultState = () => {
  return {
    isLoading: true,
    ethereum: null,
    provider: null,
    contract: null,
    hooks: setupHooks({} as any),
  };
};

export const createWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependancies & { isLoading: boolean }): Web3State => {
  return {
    isLoading,
    ethereum,
    provider,
    contract,
    hooks: setupHooks({ ethereum, provider, contract }),
  };
};

export const loadContract = async (
  name: string,
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    Promise.reject("NETWORK_ID is not defined");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  if (Artifact.networks[NETWORK_ID!].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID!].address,
      Artifact.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`contract ${name} cannot be loaded`);
  }
};
