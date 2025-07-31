import { _2025_2026 } from './aisd-days-2025-2026/dates.js';
import { renderBeans } from '/count.js';

const dates = _2025_2026;
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

export const aisdDays2025_2026 = () => {
  renderBeans({
    count,
    label,
  });
}
