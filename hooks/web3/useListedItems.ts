import { ethers } from "ethers";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";
import { Item } from "../../types/Item";
import { useCallback } from "react";

type UseListedItemsResponse = {
  buyItem: (token: number, value: string) => Promise<void>;
};

type ListedItemsHookFactory = CryptoHookFactory<Item[], UseListedItemsResponse>;

export type UseListedItemHook = ReturnType<ListedItemsHookFactory>;

export const hookFactory: ListedItemsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useListedItems" : null,
      async () => {
        const items: Item[] = [];
        const coreItems = await contract!.getAllItemsOnSale();

        for (let i = 0; i < coreItems.length; i++) {
          const item = coreItems[i];
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const owner = await contract!.ownerOf(item.tokenId);
          const metaRes = await fetch(tokenURI);
          const itemData = await metaRes.json();
          const meta = {
            ...itemData,
            rupee_price: itemData.rPrice,
            eth_price: itemData.price,
          };

          items.push({
            price: ethers.utils.formatEther(item.price),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta,
            owner,
          });
        }

        return items;
      }
    );

    const _contract = contract;
    const buyItem = useCallback(
      async (tokenId: number, value: string) => {
        try {
          const result = await _contract?.buyItem(tokenId, {
            value: ethers.utils.parseEther(value),
          });
          await result?.wait();
        } catch (error: any) {
          console.error(error.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [_contract]
    );

    return {
      ...swr,
      data: data,
      buyItem,
    };
  };
