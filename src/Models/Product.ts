import Item from "./ProductItem";

class Product {
  id?: string;
  name?: string;
  items?: Item[];
  isAvailable?: boolean;
  price?: {
    currency?: string;
    main?: number;
  };
}
export default Product;
