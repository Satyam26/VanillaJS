const addUser = document.getElementById('addUser');
const doubleMoney = document.getElementById('doubleMoney')
const showOnlyMillionaires = document.getElementById('showOnlyMillionaires')
const sortByRichest = document.getElementById('sortByRichest')
const calculateEntireWealth = document.getElementById('calculateEntireWealth');
const personList = document.getElementById('personList');

// global users variable
let users = [];

async function getNewUserData() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  const userData = data.results[0];
  const user = {
    name: `${userData.name.first} ${userData.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(user)
}

function addData(user) {
  users.push(user);
  updateDOM(users);
}

function updateDOM(providedUsers = users) {
  personList.innerHTML = '';
  providedUsers.forEach(user => {
    const newUserItem = document.createElement('li');
    newUserItem.classList.add('person');
    const nameEl = document.createElement('h4');
    nameEl.textContent = user.name;
    const wealthEl = document.createElement('h5')
    wealthEl.textContent = `$${formatMoney(user.money)}`;
    newUserItem.appendChild(nameEl);
    newUserItem.appendChild(wealthEl);
    personList.appendChild(newUserItem);
  })
}

// format money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//double money
function doubleMoneyFunc() {
  /* using forEach */
  /* users.forEach(user => {
    user.money = user.money * 2;
  });
  updateDOM(users); */
  /* using map function */
  users = users.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM(users);
}

//sort in descending order and show
function sortUsers() {
  users.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM(users);
}

// show only millionaires 
function showOnlyMillionairesFunc() {
  users = users.filter(user => {
    console.log(user.money > 1000000)
    return user.money > 1000000;
  })
  console.log(users)
  updateDOM(users);
}

function calculateTotalAndDisplay() {
  const total = users.reduce((acc, user) => acc + user.money, 0);
  const item = document.createElement('li');
  item.classList.add('total');
  const nameEl = document.createElement('h3');
  nameEl.textContent = 'Total Wealth';
  const totalEl = document.createElement('h3');
  totalEl.textContent = '$' + formatMoney(total);
  item.appendChild(nameEl);
  item.appendChild(totalEl);
  personList.appendChild(item);
}

//functions and event listeners
getNewUserData();
addUser.addEventListener('click', getNewUserData);
doubleMoney.addEventListener('click', doubleMoneyFunc);
sortByRichest.addEventListener('click', sortUsers);
showOnlyMillionaires.addEventListener('click', showOnlyMillionairesFunc);
calculateEntireWealth.addEventListener('click', calculateTotalAndDisplay)