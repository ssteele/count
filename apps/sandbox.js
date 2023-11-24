import { renderBeans } from '/count.js';

// fixed values
const count = {
  done: 80,
  todo: 100,
};
const label = {
  done: 'Days attended',
  todo: 'Days remaining',
};

export const sandbox = () => {
  renderBeans({
    count,
    label,
  });
}
