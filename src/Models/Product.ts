import Item from "./ProductItem";

class Product {
  id?: string;
  name?: string;
  items?: Item[];
  isAvailable?:boolean;
}
export default Product;
