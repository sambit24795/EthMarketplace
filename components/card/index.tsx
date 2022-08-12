import Image from "next/image";
import { FunctionComponent } from "react";
import { Item } from "../../types/Item";

interface CardProps {
  item: Item;
}

const Card: FunctionComponent<CardProps> = ({ item }) => {
  return (
    <div className="transition shadow-xl card w-96 bg-base-100">
      <figure className="px-10 pt-10">
        <Image
          src={item.image}
          alt={item.name}
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
            <div className="stat-value">{item.rupee_price} &#x20b9;</div>
            <div className="stat-desc">{item.eth_price} &#240;</div>
          </div>
        </div>
        <h2 className="card-title">{item.name}</h2>
        <p>{item.description}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
