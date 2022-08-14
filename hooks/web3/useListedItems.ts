import { ethers } from "ethers";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";
import { Item } from "../../types/Item";

type UseListedItemsResponse = {};

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
          const metaRes = await fetch(tokenURI);
          const meta = await metaRes.json();

          items.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            meta,
          });
        }

        return items;
      }
    );

    return {
      ...swr,
      data: data,
    };
  };
