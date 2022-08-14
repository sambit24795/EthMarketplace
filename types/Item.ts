export interface ItemMeta {
  id: string;
  description: string;
  image: string;
  name: string;
  rupee_price: number;
  eth_price: number;
  info: string;
}

export interface ItemCore {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean;
}

export interface Item extends ItemCore {
  meta: ItemMeta;
}
