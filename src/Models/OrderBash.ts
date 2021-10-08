import Order from "./Order";
class OrderBash {
  id?: string;
  bashName?: string;
  handlerId?: string;
  dateCreated?: string;
  bashOuickText?: string;
  orders?: Order[];
  constructor(id:string, bashName:string) {
    this.id = id;
    this.bashName = bashName;
  }
}

export default OrderBash;
