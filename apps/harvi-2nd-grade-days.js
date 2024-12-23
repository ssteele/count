import { _2024_2025 } from './harvi-2nd-grade-days/dates.js';
import { renderBeans } from '/count.js';

const dates = _2024_2025;
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

export const harvi2ndGradeDays = () => {
  renderBeans({
    count,
    label,
  });
}
