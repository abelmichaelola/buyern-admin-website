enum PARTY_TYPE {
  USER = "USER",
  BUSINESS = "BUSINESS",
}
enum TRANSACTION_TYPE {
  DEBIT = "DR",
  CREDIT = "CR"
}
enum TRANSACTION_STATUS {
  INITIATED = "INITIATED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
enum TRANSACTION_PURPOSE {
  PAYMENT = "PAYMENT",
  REVERSAL = "REVERSAL",
}
enum TRANSACTION_PLATFORM {
  BUYERN = "BUYERN",
  SHOPERDE = "SHOPERDE",
}
interface Party {
  id?: string;
  type?: PARTY_TYPE;
  name?: string;
  details?: string;
}
class Transaction {
  id?: string;
  title?: string;
  type?: TRANSACTION_TYPE;
  dateInitiated?: string;
  dateCompleted?: string;
  purpose?: TRANSACTION_PURPOSE;
  platform?: TRANSACTION_PLATFORM;
  sender?: Party;
  receiver?: Party;
  status?: TRANSACTION_STATUS;
}
export {
  TRANSACTION_STATUS,
  PARTY_TYPE,
  TRANSACTION_PURPOSE,
  TRANSACTION_PLATFORM,
  TRANSACTION_TYPE
};
export default Transaction;
