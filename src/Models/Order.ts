import OrderItem from "./OrderItem";
class Order {
  id?: string;
  name?: string;
  dateCreated?: string;
  expireDate?: string;
  orderItems?: OrderItem[];
  constructor() {}
}

export default Order;