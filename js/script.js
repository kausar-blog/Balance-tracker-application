// Select elements
const TotalBalanceAmount = document.getElementById("balanceAmount");
const incomeTotal = document.getElementById("incomeTotal");
const expensesTotal = document.getElementById("expensesTotal");
const transactionDetails = document.getElementById("transactionDetails");
const transactionAmount = document.getElementById("transactionAmount");
const addBtn = document.getElementById("addBtn");
const subtractBtn = document.getElementById("subtractBtn");
const transactionContainer = document.getElementById("transactionContainer");

// Initialize totals
let balance = 0;
let income = 0;
let expenses = 0;
function validateInputs() {
  const details = transactionDetails.value.trim();
  const amount = transactionAmount.value.trim();

  if (
    details === "" ||
    details.length < 8 ||
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
}

function addAmount() {
  const details = transactionDetails.value;
  const amount = transactionAmount.value;

  balance += Number(amount);
  income += Number(amount);
  TotalBalanceAmount.innerHTML = balance;
  incomeTotal.innerHTML = income;

  const div = document.createElement("div");

  div.classList =
    "bg-green-100/50 backdrop-blur-md rounded-xl p-4 flex justify-between shadow-inner text-green-800";

  div.innerHTML = `
    <p class="font-semibold">${details}</p>
      <p class="font-semibold">${income}</p>
    `;

  console.log(div);
  transactionContainer.appendChild(div);

  transactionDetails.value = "";
  transactionAmount.value = "";
}

function subtractAmount() {
  const details = transactionDetails.value;
  const amount = transactionAmount.value;

  if (Number(transactionAmount.value) > balance) {
    alert(`Insufficient balance! Available balance: $${balance.toFixed(2)}.`);
    transactionAmount.focus();
    return;
  }

  balance -= Number(amount);
  expenses += Number(amount);

  TotalBalanceAmount.innerHTML = balance;
  expensesTotal.innerHTML = expenses;

  const div = document.createElement("div");

  div.classList =
    "bg-red-100/50 backdrop-blur-md rounded-xl p-4 flex justify-between shadow-inner text-red-800";

  div.innerHTML = `
    <p class="font-semibold">${details}</p>
      <p class="font-semibold">${expenses}</p>
    `;

  transactionContainer.appendChild(div);

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
