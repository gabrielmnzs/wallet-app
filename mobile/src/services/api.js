const api = {
  transactions: [
    {
      category: "Checkout",
      item: "Depósito Bancário",
      amount: "100.00",
      type: "spending",
      datetime: "2020-08-20",
      status: "pending"
    },
    {
      category: "MGM",
      item: "Indicação",
      amount: "100.00",
      type: "income",
      datetime: "2020-08-19",
      status: "approved"
    },
    {
      category: "MGM",
      item: "Indicação",
      amount: "100.00",
      type: "income",
      datetime: "2020-08-18",
      status: "approved"
    },
    {
      category: "MGM",
      item: "Indicação",
      amount: "100.00",
      type: "income",
      datetime: "2020-08-17",
      status: "approved"
    }
  ],
  total: 4,
};

export default api;