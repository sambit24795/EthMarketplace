import { ethers } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";
import { CryptoHookFactory } from "../../types/hooks";
import { Item } from "../../types/Item";

type UseOwnedItemsResponse = {
  listItems: (tokenId: number, price: number) => Promise<void>;
};

type OwnedItemsHookFactory = CryptoHookFactory<Item[], UseOwnedItemsResponse>;

export type UseOwnedItemHook = ReturnType<OwnedItemsHookFactory>;

export const hookFactory: OwnedItemsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useOwnedItems" : null,
      async () => {
        const items: Item[] = [];
        const coreItems = await contract!.getOwnedItems();

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
            price: parseFloat(ethers.utils.formatEther(item.price)),
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
    const listItems = useCallback(
      async (tokenId: number, price: number) => {
        try {
          const result = await _contract?.placeItemOnSale(
            tokenId,
            ethers.utils.parseEther(price.toString()),
            {
              value: ethers.utils.parseEther("0.025"),
            }
          );
          await result?.wait();

          alert("Item has been listed to sale");
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
      listItems,
    };
  };
