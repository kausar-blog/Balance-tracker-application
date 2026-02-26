// Select elements
const TotalBalanceAmount = document.getElementById("balanceAmount");
const incomeTotal = document.getElementById("incomeTotal");
const expensesTotal = document.getElementById("expensesTotal");
const transactionDetails = document.getElementById("transactionDetails");
const transactionAmount = document.getElementById("transactionAmount");
const addBtn = document.getElementById("addBtn");
const subtractBtn = document.getElementById("subtractBtn");
const transactionContainer = document.getElementById("transactionContainer");
const viewDetailsBtn = document.getElementById("viewDetailsBtn");
const transactionModal = document.getElementById("transactionModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTransactionContainer = document.getElementById(
  "modalTransactionContainer",
);

// Initialize totals
let balance = 0;
let income = 0;
let expenses = 0;

// Transaction array
let transactions = []; // { details, amount, type }

// Constants for type
const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};

// validate input
function validateInputs() {
  const details = transactionDetails.value.trim();
  const amount = transactionAmount.value.trim();

  if (
    details === "" ||
    details.length < 3 ||
    details.length > 50 ||
    !isNaN(details)
  ) {
    alert("Please enter valid transaction details!");
    transactionDetails.value = "";
    transactionDetails.focus();
    return true;
  }

  if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid amount greater than 0!");
    transactionAmount.value = "";
    transactionAmount.focus();
    return true;
  }
  return false;
}

// Create transaction element
function createTransaction(details, amount, type) {
  const div = document.createElement("div");

  div.className =
    type === TRANSACTION_TYPE.INCOME
      ? "bg-green-100/50 backdrop-blur-md rounded-xl p-4 flex justify-between shadow-inner text-green-800"
      : "bg-red-100/50 backdrop-blur-md rounded-xl p-4 flex justify-between shadow-inner text-red-800";

  div.innerHTML = `
    <p class="font-semibold">${details}</p>
    <p class="font-semibold">$${amount.toFixed(2)}</p>
  `;

  return div;
}

// render transactions
function renderMainTransactions() {
  transactionContainer.innerHTML = "";
  transactions.forEach((tx) => {
    const div = createTransaction(tx.details, tx.amount, tx.type);
    transactionContainer.appendChild(div);
  });
}

// render transactions to modal
function renderModalTransactions() {
  modalTransactionContainer.innerHTML = "";
  transactions.forEach((tx) => {
    const div = createTransaction(tx.details, tx.amount, tx.type);
    modalTransactionContainer.appendChild(div);
  });
}

// add transaction
function addAmount() {
  const details = transactionDetails.value.trim();
  const amount = Number(transactionAmount.value);

  balance += amount;
  income += amount;

  TotalBalanceAmount.textContent = balance.toFixed(2);
  incomeTotal.textContent = income.toFixed(2);

  transactions.push({ details, amount, type: TRANSACTION_TYPE.INCOME });

  renderMainTransactions();

  transactionDetails.value = "";
  transactionAmount.value = "";
}

function subtractAmount() {
  const details = transactionDetails.value.trim();
  const amount = Number(transactionAmount.value);

  if (amount > balance) {
    alert(`Insufficient balance! Available balance: $${balance.toFixed(2)}.`);
    transactionAmount.focus();
    return;
  }

  balance -= amount;
  expenses += amount;

  TotalBalanceAmount.textContent = balance.toFixed(2);
  expensesTotal.textContent = expenses.toFixed(2);

  transactions.push({ details, amount, type: TRANSACTION_TYPE.EXPENSE });

  renderMainTransactions();

  transactionDetails.value = "";
  transactionAmount.value = "";
}

addBtn.addEventListener("click", () => {
  if (validateInputs()) return;
  addAmount();
});

subtractBtn.addEventListener("click", () => {
  if (validateInputs()) return;
  subtractAmount();
});

viewDetailsBtn.addEventListener("click", () => {
  transactionModal.style.display = "flex";
  renderModalTransactions();
});

closeModalBtn.addEventListener("click", () => {
  transactionModal.style.display = "none";
});
