import OrderBash from "./../Models/OrderBash";
import { getOrderData } from "./Orderdata";
var OrderBashData: OrderBash = {
  id: "OrderBashId",
  bashName: "bashName",
  handlerId: "handlerId",
  dateCreated: "5th June 2021",
  orders: [
    getOrderData("itemId_itemId_1", "Rice and Ewedu"),
    getOrderData("itemId_2", "Semo and stuffs"),
    getOrderData("itemId_3", "garri"),
    getOrderData("itemId_4", "beans and egg"),
    getOrderData("itemId_5", "eba"),
    getOrderData("itemId_6", "Rice and Ewedu"),
    getOrderData("itemId_7", "Semo and stuffs"),
    getOrderData("itemId_8", "garri"),
    getOrderData("itemId_9", "beans and egg"),
    getOrderData("itemId_10", "eba"),
  ],
};
var getOrderBashData = (id: string, name: string): OrderBash => {
  return {
    id: id,
    bashName: name,
    handlerId: "handlerId",
    dateCreated: "5th June 2021",
    orders: [
      getOrderData("1", "Rice and Ewedu"),
      getOrderData("2", "Semo and stuffs"),
      getOrderData("3", "garri"),
      getOrderData("4", "beans and egg"),
      getOrderData("5", "eba"),
      getOrderData("6", "Rice and Ewedu"),
      getOrderData("7", "Semo and stuffs"),
      getOrderData("8", "garri"),
      getOrderData("9", "beans and egg"),
      getOrderData("10", "eba"),
    ],
  };
};
export { getOrderBashData };
export default OrderBashData;
