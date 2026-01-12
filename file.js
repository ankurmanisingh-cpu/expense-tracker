const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();

  text.value = "";
  amount.value = "";
}

function renderTransactions() {
  list.innerHTML = "";

  transactions.forEach(trx => {
    const sign = trx.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(trx.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
      ${trx.text}
      <span>${sign}₹${Math.abs(trx.amount)}</span>
      <button onclick="removeTransaction(${trx.id})">x</button>
    `;

    list.appendChild(item);
  });

  updateValues();
}

function updateValues() {
  const amounts = transactions.map(trx => trx.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0);
  const inc = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0);
  const exp = amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${inc}`;
  expense.innerText = `₹${Math.abs(exp)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(trx => trx.id !== id);
  updateLocalStorage();
  renderTransactions();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);
renderTransactions();