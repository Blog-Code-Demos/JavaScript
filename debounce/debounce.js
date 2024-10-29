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

const input = document.querySelector("#input");
const list = document.querySelector("#list");

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
    timer = setTimeout(() => cb(text), delay);
  };
}

const debounceEventHandler = debounce((text) => {
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
});

input.addEventListener("input", (e) => debounceEventHandler(e.target.value));
