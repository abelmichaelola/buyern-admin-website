import OrderData, { getOrderData } from '../data/Orderdata';
import Order from './../Models/Order';
class OrderController {
  getOrder = (orderId?: string): Order => {
      let data = OrderData;
      if (orderId) {
          data.id = orderId;
      }
    return data;
  };
  getOrders = ():Order[] =>{
      return [
        getOrderData("Item_id_1", "Rice and Ewedu"),
        getOrderData("Item_id_2", "Semo and stuffs"),
        getOrderData("Item_id_3", "garri"),
        getOrderData("Item_id_4", "beans and egg"),
        getOrderData("Item_id_5", "eba"),
        getOrderData("Item_id_6", "Rice and Ewedu"),
        getOrderData("Item_id_7", "Semo and stuffs"),
        getOrderData("Item_id_8", "garri"),
        getOrderData("Item_id_9", "beans and egg"),
        getOrderData("Item_id_10", "eba"),
        getOrderData("Item_id_11", "Rice and Ewedu"),
        getOrderData("Item_id_12", "Semo and stuffs"),
        getOrderData("Item_id_13", "garri"),
        getOrderData("Item_id_14", "beans and egg"),
        getOrderData("Item_id_15", "eba"),
        getOrderData("Item_id_16", "Rice and Ewedu"),
        getOrderData("Item_id_17", "Semo and stuffs"),
        getOrderData("Item_id_18", "garri"),
        getOrderData("Item_id_19", "beans and egg"),
        getOrderData("Item_id_8", "garri"),
        getOrderData("Item_id_9", "beans and egg"),
        getOrderData("Item_id_10", "eba"),
        getOrderData("Item_id_11", "Rice and Ewedu"),
        getOrderData("Item_id_12", "Semo and stuffs"),
        getOrderData("Item_id_13", "garri"),
        getOrderData("Item_id_14", "beans and egg"),
        getOrderData("Item_id_15", "eba"),
        getOrderData("Item_id_16", "Rice and Ewedu"),
        getOrderData("Item_id_17", "Semo and stuffs"),
        getOrderData("Item_id_18", "garri"),
        getOrderData("Item_id_19", "beans and egg"),
      ];
  }
  setOrder = (orderId: string) => {};
  updoteOrder = (orderId: string) => {};
  deleteOrder = (orderId: string) => {};
  invalidateOrder = (orderId: string) => {};
}
export default OrderController;