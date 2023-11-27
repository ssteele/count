// register dom elements
const appSelector = document.getElementById('app-selector');
const todoEl = document.getElementById('todo');
const doneEl = document.getElementById('done');

export const getDomElements = () => {
  return {
    appSelector,
    todoEl,
    doneEl,
  };
}
