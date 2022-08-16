import CardList from "../cardList";
import Link from "next/link";
import { useListeditems, useAccount } from "../../hooks/index";
import { Item } from "../../types/Item";
import { useEffect, useState } from "react";

// used only for display purposes
const tokenURIs = [
  "https://gateway.pinata.cloud/ipfs/QmekE9H3tqNvXBPt1y6EjWZ5UtcUaQb3u6oJawYeYre81T",
  "https://gateway.pinata.cloud/ipfs/QmSz43arx3JVmipRxAgFvqEzc9Z1HxiwzwBYaWqP8QAg9C",
  "https://gateway.pinata.cloud/ipfs/QmY1uV2D6bwYcnMk4UFCgES934vYjpXG3nUnuaEDx6toGH",
];

const MidSection = () => {
  const [fallbackData, setFallbackData] = useState<Item[]>([]);

  const { itemData } = useListeditems();
  const { account } = useAccount();

  const isUserLoggedIn = !!account?.data?.address;

  const getAllInitialData = (): Array<Item> => {
    const metaData: Item[] = [];
    tokenURIs.forEach(async (uri) => {
      const res = await fetch(uri);
      const data = await res.json();
      const meta: Item["meta"] = {
        ...data,
        rupee_price: data.rPrice,
        eth_price: data.price,
      };
      const mockItem: Item = {
        creator: "",
        owner: "",
        price: meta.eth_price,
        isListed: true,
        tokenId: Math.random() * 3,
        meta,
      };
      metaData.push(mockItem);
    });

    return metaData;
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      setFallbackData(getAllInitialData());
    }
  }, [isUserLoggedIn]);

  const dataToDisplay = isUserLoggedIn
    ? itemData?.data?.slice(0, 3)
    : fallbackData;

  return (
    <div className="grid gap-10 p-14 auto-cols-auto auto-rows-2 bg-custom-muted-sky-blue">
      {!isUserLoggedIn ? null : !dataToDisplay?.length ? (
        <div className="flex items-center justify-center text-3xl font-extrabold capitalize transition cursor-pointer text-custom-light-sky-blue hover:text-base-100">
          <span>There are no items for you to buy</span>
        </div>
      ) : (
        <div className="flex items-center justify-center text-3xl font-extrabold underline capitalize transition cursor-pointer text-custom-light-sky-blue hover:text-base-100">
          <Link href="/items">See All</Link>
        </div>
      )}
      <div className="grid overflow-hidden sm:grid-cols-1 md:grid-cols-3 justify-items-center auto-rows-auto">
        <CardList items={dataToDisplay || []} />
      </div>
    </div>
  );
};

export default MidSection;
