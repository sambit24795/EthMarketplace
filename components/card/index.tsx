import Image from "next/image";
import { FunctionComponent } from "react";
import { Item } from "../../types/Item";
import { useAccount, useListeditems, useOwneditems } from "../../hooks/index";

interface CardProps {
  item: Item;
}

const Card: FunctionComponent<CardProps> = ({ item }) => {
  const {
    itemData: { buyItem },
  } = useListeditems();
  const {
    ownedData: { listItems },
  } = useOwneditems();
  const {
    account: { data, isInstalled, connect },
  } = useAccount();

  const isItemOwnedByCreator = data?.address === item?.owner;
  const isLoggedIn = !!data?.address;

  const connectHandler = () => {
    if (isInstalled) {
      connect();
    } else {
      window.open("https://metamask.io", "_blank");
    }
  };

  const actionHandler = async () => {
    if (!isLoggedIn) {
      connectHandler();
      return;
    }

    if (isItemOwnedByCreator) {
      await listItems(item.tokenId, item.price);
    } else {
      await buyItem(item.tokenId, item.price);
    }
  };

  return (
    <div className="transition shadow-xl card w-96 bg-base-100">
      <figure className="px-10 pt-10">
        <Image
          src={item.meta.image}
          alt={item.meta.name}
          priority
          layout="intrinsic"
          height={200}
          width={270}
        />
      </figure>

      <div className="items-center text-center card-body">
        <div className="shadow stats">
          <div className="stat">
            <div className="capitalize stat-title">Price</div>
            <div className="uppercase stat-value">{item.price} eth</div>
            <div className="stat-desc">{item.meta.rupee_price} &#x20b9;</div>
          </div>
        </div>
        <h2 className="card-title">{item.meta.name}</h2>
        <p>{item.meta.description}</p>
        <div className="py-1 card-actions">
          <button className="btn btn-primary" onClick={actionHandler}>
            {!isLoggedIn
              ? "Preview"
              : isItemOwnedByCreator
              ? "Sale Item"
              : "Buy Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
