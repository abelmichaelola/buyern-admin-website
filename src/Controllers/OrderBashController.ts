import OrderBashData, { getOrderBashData } from './../data/OrderBashData';
import OrderBash from './../Models/OrderBash';
class OrderBashController {
  getBash = (bashId: string): OrderBash => {
    let data = OrderBashData;
    if (bashId) {
      data.id = bashId;
    }
    return data;
  };
  
  getBashes = () => {

    let data: OrderBash[] = [
      getOrderBashData("1", "Bash 1"),
      getOrderBashData("2", "Bash 2"),
      getOrderBashData("3", "Bash 3"),
      getOrderBashData("4", "Bash 4"),
      getOrderBashData("5", "Bash 5"),
      getOrderBashData("6", "Bash 6"),
      getOrderBashData("7", "Bash 7"),
      getOrderBashData("8", "Bash 8"),
      getOrderBashData("9", "Bash 9"),
    ];
    return data;
  };
  setBash = (bashId: string) => {};
  updoteBash = (bashId: string) => {};
  deleteBash = (bashId: string) => {};
  invalidateBash = (bashId: string) => {};
}
export default OrderBashController;