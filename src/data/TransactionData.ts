import { TRANSACTION_STATUS, TRANSACTION_PLATFORM, TRANSACTION_PURPOSE, PARTY_TYPE, TRANSACTION_TYPE } from "../Models/Transaction";
import Transaction from './../Models/Transaction';

const TransactionData:Transaction = {
  id: "transactionId",
  title: "transactionName",
  type: TRANSACTION_TYPE.DEBIT,
  status: TRANSACTION_STATUS.COMPLETED,
  dateInitiated: "5th, June 2021",
  dateCompleted: "29th, November 2021",
  platform: TRANSACTION_PLATFORM.BUYERN,
  purpose: TRANSACTION_PURPOSE.PAYMENT,
  sender: {
    id: "sender Id",
    name: "sender Name",
    details: "aditional Details",
    type: PARTY_TYPE.USER,
  },
  receiver: {
    id: "receiver Id",
    name: "receiver Name",
    details: "additional Details",
    type: PARTY_TYPE.BUSINESS,
  },
};


var getTransactionData = (id: string, name: string,type:TRANSACTION_TYPE, status:TRANSACTION_STATUS): Transaction => {
  return {
  id: id,
  title: name,
  type: type,
  status: status,
  dateInitiated: "5th, June 2021",
  dateCompleted: "29th, November 2021",
  platform: TRANSACTION_PLATFORM.BUYERN,
  purpose: TRANSACTION_PURPOSE.PAYMENT,
  sender: {
    id: "sender Id",
    name: "sender Name",
    details: "aditional Details",
    type: PARTY_TYPE.USER,
  },
  receiver: {
    id: "receiver Id",
    name: "receiver Name",
    details: "additional Details",
    type: PARTY_TYPE.BUSINESS,
  },
}};
export {getTransactionData}
export default TransactionData;