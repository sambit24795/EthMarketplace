import { FunctionComponent } from "react";
import Card from "../card";
import { Item } from "../../types/Item";

interface CardListProps {
  items: Array<Item>;
}

const CardList: FunctionComponent<CardListProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Card key={item.meta.image} item={item} />
      ))}
    </>
  );
};

export default CardList;
