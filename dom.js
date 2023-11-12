// register dom elements
const todoEl = document.getElementById('todo');
const doneEl = document.getElementById('done');

export const getDomElements = () => {
  return {
    todoEl,
    doneEl,
  };
}
