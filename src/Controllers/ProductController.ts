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
  getProducts = (): Product[] => {
    return [
      getProductData("product_id_1", "Rice and Stew with marinated Chicken", {
        currency: "₦",
        main: 3000.99,
      }),
      getProductData("product_id_2", "Semo and Ogbona", {
        currency: "₦",
        main: 38572.99,
      }),
      getProductData("product_id_3", "Efo With Amala", {
        currency: "₦",
        main: 6745.99,
      }),
      getProductData("product_id_4", "Bread and beans", {
        currency: "₦",
        main: 3948.99,
      }),
      getProductData("product_id_5", "Bread and tea", {
        currency: "₦",
        main: 5287.99,
      }),
      getProductData("product_id_6", "peppersoup with catfish", {
        currency: "₦",
        main: 78904.99,
      }),
      getProductData("product_id_7", "yam and Peppersoup", {
        currency: "₦",
        main: 98453.99,
      }),
      getProductData("product_id_8", "Fish and Spaghetti", {
        currency: "₦",
        main: 87534.99,
      }),
      getProductData("product_id_9", "Goat meat and peppersoup", {
        currency: "₦",
        main: 20446.99,
      }),
    ];
  };
  setProduct = (id: string) => {};
  updateProduct = (id: string) => {};
  deleteProduct = (id: string) => {};
  invalidateProduct = (id: string) => {};
}
export default ProductController;
