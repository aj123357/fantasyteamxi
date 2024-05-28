export const createOrderId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return "ft11_" + code;
};

export const fetchCurrentMatchTransactions = (id) => {
  const allTransactions = JSON.parse(
    localStorage.getItem("userDetails")
  ).transactions;

  if (allTransactions === undefined || allTransactions.length === 0) {
    return [];
  }
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today
  console.log("todaystart", todayStart);
  console.log("todayEnd", todayEnd);

  const currentTransactions = allTransactions.filter((transaction) => {
    return (
      // transactionDate >= todayStart &&
      // transactionDate < todayEnd &&
      transaction?.matchId === id && transaction?.status === "captured"
    );
  });
  console.log("currentTransactions", currentTransactions);
  return currentTransactions;
  // setCurrentTransactions(currentTransactions);
};
