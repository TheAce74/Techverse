function getData(name) {
  return JSON.parse(localStorage.getItem(name));
}

function setData(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function removeData(name) {
  localStorage.removeItem(name);
}

export { getData, setData, removeData };
