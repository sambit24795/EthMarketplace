export interface ItemMeta {
  description: string;
  image: string;
  name: string;
  rupee_price: string;
  eth_price: string;
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
  owner: string;
}

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}
