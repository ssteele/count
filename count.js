import {
  BEANS_PER_ROW_DEFAULT,
  BEANS_PER_ROW_OPTIONS,
  CONTAINER_PAD,
} from '/constants.js';
import { getDomElements } from '/dom.js';

// register dom elements
const { appSelector, todoEl, doneEl } = getDomElements();

export const renderSelector = (options = []) => {
  options.map(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.innerHTML = option.label;
    optionEl.selected = option.selected;
    appSelector.appendChild(optionEl);
  })
}

const generateBeans = ({
  beansPerRow,
  beanSize,
  count,
  element,
}) => {
  let beanEls = [];
  Array(count).fill().map((_, i) => {
    const beanEl = document.createElement('div');
    beanEl.className = 'bean';

    const bottom = Math.floor(i / beansPerRow) * beanSize;
    const left = (i % beansPerRow) * beanSize;
    beanEl.style.cssText = `
      bottom: ${bottom}px; 
      left: ${left}px;
      height: ${beanSize}px;
      width: ${beanSize}px;
    `;
    beanEls.push(beanEl);
  });
  element.append(...beanEls);
}

const generateLabels = ({
  count,
  element,
  label,
}) => {
  const labelEl = document.createElement('h2');
  labelEl.className = 'label';
  const labelContent = document.createTextNode(label);
  labelEl.appendChild(labelContent);

  const countEl = document.createElement('div');
  countEl.className = 'count';
  const countContent = document.createTextNode(count);
  countEl.appendChild(countContent);

  element.append(labelEl);
  element.append(countEl);
}

export const renderBeans = ({
  count,
  label,
}) => {
  // derive values
  const windowHeight = window.innerHeight;
  const availableGridWidth = todoEl.offsetWidth - CONTAINER_PAD;

  const maxCount = Math.max(count.todo, count.done);
  const idealSquareLength = Math.sqrt(maxCount);
  const beansPerRow = BEANS_PER_ROW_OPTIONS.reduce((prev, curr) => {
    return (Math.abs(curr - idealSquareLength) < Math.abs(prev - idealSquareLength) ? curr : prev);
  }) || BEANS_PER_ROW_DEFAULT;
  const columnCount = Math.ceil(Math.max(count.todo, count.done) / beansPerRow);
  let beanSize = availableGridWidth / Math.max(beansPerRow, columnCount);

  let gridHeight = columnCount * beanSize;
  if (gridHeight > windowHeight - CONTAINER_PAD * 4) {
    gridHeight = windowHeight - CONTAINER_PAD * 4;
    beanSize = gridHeight / Math.max(beansPerRow, columnCount);
  }

  const gridWidth = beansPerRow * beanSize;

  const gridStyle = `
    height: ${gridHeight}px;
    width: ${gridWidth}px;
  `;
  todoEl.style.cssText = gridStyle;
  doneEl.style.cssText = gridStyle;

  generateBeans({
    beansPerRow,
    beanSize,
    count: count.todo,
    element: todoEl,
  });

  generateLabels({
    count: count.todo,
    element: todoEl,
    label: label.todo,
  });

  generateBeans({
    beansPerRow,
    beanSize,
    count: count.done,
    element: doneEl,
  });

  generateLabels({
    count: count.done,
    element: doneEl,
    label: label.done,
  });
}

export const clearBeans = () => {
  todoEl.innerHTML = '';
  todoEl.style.cssText = {};

  doneEl.innerHTML = '';
  doneEl.style.cssText = {};
}
