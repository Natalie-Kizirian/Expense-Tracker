const balance = document.getElementById("balance");
const categoryInput = document.getElementById("category-input");
const amountInput = document.getElementById("amount-input");
const expenseBtn = document.getElementById("expense-btn");
const incomeBtn = document.getElementById("income-btn");
const list = document.getElementById("list");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = [];
//Save Local
function saveLocal() {
  localStorage.setItem("myTransaction", JSON.stringify(transactions));
}
//Get Local
function getLocal() {
  transactions = JSON.parse(localStorage.getItem("myTransaction")) || [];
  transactions.forEach((myTransaction) => createList(myTransaction));
  updateBalance();
}
document.addEventListener("DOMContentLoaded", getLocal);

//Main Transaction Function
function createList(transaction) {
  const newItem = document.createElement("li");
  const textSpan = document.createElement("span");
  const amountSpan = document.createElement("span");
  const delBtn = document.createElement("button");
  const sign = transaction.amount > 0 ? "+" : "";

  textSpan.innerText = `${transaction.text} `;
  amountSpan.innerText = `${sign}${transaction.amount} €`;
  delBtn.innerText = " 🗑️ ";
  delBtn.classList.add("del-btn");
  //delBtn
  delBtn.addEventListener("click", function () {
    newItem.remove();
    transactions = transactions.filter((t) => t.id !== transaction.id);
    saveLocal();
    updateBalance();
  });

  if (transaction.amount > 0) {
    newItem.classList.add("plus");
  } else if (transaction.amount < 0) {
    newItem.classList.add("minus");
  } else {
    newItem.classList.add("neutral");
  }

  newItem.appendChild(textSpan);
  newItem.appendChild(amountSpan);
  newItem.appendChild(delBtn);

  list.appendChild(newItem);
}

//Income Button
incomeBtn.addEventListener("click", function () {
  const textInput = categoryInput.value.trim();
  if (textInput.length > 0) {
    const transactionObject = {
      id: Math.floor(Math.random() * 1000),
      text: categoryInput.value,
      amount: Number(amountInput.value),
    };
    transactions.push(transactionObject);
    createList(transactionObject);
    categoryInput.value = "";
    amountInput.value = "";
    saveLocal();
    updateBalance();
  }
});

//Epxense Button
expenseBtn.addEventListener("click", function () {
  const textInput = categoryInput.value.trim();
  if (textInput.length > 0) {
    const transactionObject = {
      id: Math.floor(Math.random() * 1000),
      text: categoryInput.value,
      amount: Number(amountInput.value * -1),
    };
    transactions.push(transactionObject);
    createList(transactionObject);
    categoryInput.value = "";
    amountInput.value = "";
    saveLocal();
    updateBalance();
  }
});

//Balance
function updateBalance() {
  let totalBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  balance.classList.remove("balance-plus");
  balance.classList.remove("balance-minus");

  income.classList.remove("income-plus");
  expense.classList.remove("expense-minus");

  transactions.forEach(function (transaction) {
    totalBalance = totalBalance + transaction.amount;
    if (transaction.amount > 0) {
      totalIncome = totalIncome + transaction.amount;
    } else totalExpense = totalExpense + transaction.amount;
  });

  if (totalIncome > 0) {
    income.classList.add("income-plus");
  }
  if (totalExpense < 0) {
    expense.classList.add("expense-minus");
  }
  balance.innerText = totalBalance.toFixed(2);
  income.innerText = totalIncome.toFixed(2);
  expense.innerText = totalExpense.toFixed(2);

  //Balance
  if (totalBalance > 0) {
    balance.classList.add("balance-plus");
  } else if (totalBalance < 0) {
    balance.classList.add("balance-minus");
  }
}

//localStorage.clear();
