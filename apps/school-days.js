import { _2023_2024 } from './school-days/dates.js';
import { renderBeans } from '/count.js';

const dates = _2023_2024;
const dateCount = dates.length;

const now = new Date().getTime();
const doneCount = dates.filter(d => {
  const date = new Date(d);
  if (date.getTime() < now) {
    return d;
  }
}).length;

// values
const count = {
  done: doneCount,
  todo: dateCount - doneCount,
};
const label = {
  done: 'Days attended',
  todo: 'Days remaining',
};

export const schoolDays = () => {
  renderBeans({
    count,
    label,
  });
}
