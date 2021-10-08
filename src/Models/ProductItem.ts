class Item {
  id?: string;
  name?: string;
  about?: string;
  quantity?: number;
  isAvailable?: boolean;
  price?: {
    currency?: string;
    main?: number;
  };
}
export default Item;
