import { getTransactionData } from "../data/TransactionData";
import Transaction, { TRANSACTION_STATUS, TRANSACTION_TYPE } from "../Models/Transaction";
import TransactionData from './../data/TransactionData';

class TransactionController {
  getTransaction = (id: string) => {
    let data = TransactionData;
    if (id) {
      data.id = id;
    }
    return data;
  };
  getTransactions = (): Transaction[] => {
    var dTitle:string = "transaction";
    return [
      getTransactionData(
        dTitle + "_id_1",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_2",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_3",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_4",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_5",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_6",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_7",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_8",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_9",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_10",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_11",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_12",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_13",
        "$300.00 from Abel Michael",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
      getTransactionData(
        dTitle + "_id_14",
        "$300.00 payout to 40 Accounts",
        TRANSACTION_TYPE.CREDIT,
        TRANSACTION_STATUS.COMPLETED
      ),
    ];
  };
  setTransaction = (id: string) => {};
  updateTransaction = (id: string) => {};
  deleteTransaction = (id: string) => {};
  invalidateTransaction = (id: string) => {};
}
export default TransactionController;
