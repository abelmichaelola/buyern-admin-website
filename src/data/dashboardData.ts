import TransactionData from "./TransactionData";
const DashboardData = {
  recentTransactions: {
    currentCash: "₦20,000.00",
    transactions: [
      TransactionData,
      TransactionData,
      TransactionData,
      TransactionData,
      TransactionData,
      TransactionData,
      TransactionData,
      TransactionData,
    ],
  },
  currentStatus: {
    title: "Status",
    items: {
      status: "active",
      link: "/activate",
    },
  },
  LinkedBusinesses: {
    title: "Businesses",
    items: [
      {
        name: "Shoperde Eateries",
        link: "/business/shoperdeId",
        isActive: true,
      },
      {
        name: "Shenis Apparel",
        link: "/business/shenisId",
        isActive: true,
      },
      {
        name: "Mr Biggs",
        link: "/business/mrBiggsId",
        isActive: true,
      },
    ],
  },
  StartHere: {
    items: [
      {
        title: "Verify Email",
        link: "/verifyEmail",
        status: "COMPLETED",
      },
      {
        title: "Register A Business",
        link: "/RegisterABusiness",
        status: "COMPLETED",
      },
      {
        title: "Add A Payout Method",
        link: "/addPayoutMethod",
        status: "processing",
      },
      {
        title: "Checkout The Finances Page",
        link: "/RegisterABusiness",
        status: "null",
      },
      {
        title: "add all or some items to public Listing",
        link: "/addItems",
        status: "null",
      },
      {
        title: "Register A Business",
        link: "/RegisterABusiness",
        status: "COMPLETED",
      },
      {
        title: "Register A Business",
        link: "/RegisterABusiness",
        status: "COMPLETED",
      },
    ],
  },
  newFeatures: {
    items: [
      {
        title: "can now control multiple accounts at once",
        link: "/tfgeiuoghesargstr",
      },
      {
        title: "View All features at a glance in the Dashboard",
        link: "/ethawq5ekgjpoehgte",
        status: "COMPLETED",
      },
      {
        title: "Full Control over Linked Accounts",
        link: "/rthrsktzgzhgoizt",
        status: "processing",
      }
    ],
  },
  newOrders: {
      
  }
};

export default DashboardData;
