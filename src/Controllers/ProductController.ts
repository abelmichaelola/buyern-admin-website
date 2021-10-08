import ProductData, { getProductData } from "../data/ProductData";
import Product from "../Models/Product";

class ProductController {
  getProduct = (id: string) => {
    let data = ProductData;
    if (id) {
      data.id = id;
    }
    return data;
  };
  getProducts = ():Product[] =>{
      return [
        getProductData("product_id_1", "Rice and Ewedu"),
        getProductData("product_id_2", "Rice and Ewedu"),
        getProductData("product_id_3", "Rice and Ewedu"),
        getProductData("product_id_4", "Rice and Ewedu"),
        getProductData("product_id_5", "Rice and Ewedu"),
        getProductData("product_id_6", "Rice and Ewedu"),
        getProductData("product_id_7", "Rice and Ewedu"),
        getProductData("product_id_8", "Rice and Ewedu"),
        getProductData("product_id_9", "Rice and Ewedu"),
      ];
    }
  setProduct = (id: string) => {};
  updateProduct = (id: string) => {};
  deleteProduct = (id: string) => {};
  invalidateProduct = (id: string) => {};
}
export default ProductController;