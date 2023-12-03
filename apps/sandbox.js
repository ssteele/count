import { renderBeans } from '/count.js';

// fixed values
const count = {
  done: 50,
  todo: 100,
};
const label = {
  done: 'Done',
  todo: 'Todo',
};

export const sandbox = () => {
  renderBeans({
    count,
    label,
  });
}
