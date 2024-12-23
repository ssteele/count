import { _2024_2025 } from './aisd-days-2024-2025/dates.js';
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

export const aisdDays2024_2025 = () => {
  renderBeans({
    count,
    label,
  });
}
