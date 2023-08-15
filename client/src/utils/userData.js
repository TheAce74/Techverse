function getData(name) {
  return localStorage.getItem(name);
}

function setData(name, item) {
  localStorage.setItem(name, item);
}

function removeData(name) {
  localStorage.removeItem(name);
}

export { getData, setData, removeData };
