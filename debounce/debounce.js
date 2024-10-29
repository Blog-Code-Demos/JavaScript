const MOCK_USERS = [
  "Sunil Khadka",
  "Suman Khadka",
  "Sushmita Rai",
  "Rajesh Hamal",
  "Ram Kumar",
  "Kushal Gurung",
  "Kumar Shrestha",
  "Kaliyug",
];

const list = document.querySelector("#list");
const input = document.querySelector("#input");
const resetBtn = document.querySelector("#reset");
const apiHitCount = document.querySelector("#api-hit-count");
const debounceCheckbox = document.querySelector("#debounce-checkbox");

let apiCount = 0;

printList();

function printList() {
  const listItems = MOCK_USERS.map((user) => {
    const li = document.createElement("li");
    li.innerText = user;
    return li;
  });

  list.append(...listItems);
}

function debounce(cb, delay = 700) {
  let timer;

  return (text) => {
    clearTimeout(timer);
    list.innerHTML = "Searching...";
    timer = setTimeout(() => {
      apiCount++;
      apiHitCount.innerText = apiCount;
      cb(text);
    }, delay);
  };
}

function findUser(text) {
  const items = MOCK_USERS.filter((user) => {
    if (user.includes(text)) return user;
  });

  list.innerHTML = "";

  if (items && items.length > 0) {
    const itemsList = items.map((item) => {
      const li = document.createElement("li");
      li.innerText = item;
      return li;
    });

    list.append(...itemsList);
  } else {
    list.innerText = "User Not Found!!!";
  }
}

function reset() {
  apiCount = 0;
  apiHitCount.innerText = apiCount;
  list.innerHTML = "";
  input.value = "";
  printList();
}

const debounceEventHandler = debounce(findUser);

debounceCheckbox.addEventListener("change", reset);

resetBtn.addEventListener("click", reset);

input.addEventListener("input", (e) => {
  if (debounceCheckbox.checked) {
    debounceEventHandler(e.target.value);
  } else {
    apiCount++;
    findUser(e.target.value);
    apiHitCount.innerText = apiCount;
  }
});
