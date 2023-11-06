
// fixed values
const count = {
  todo: 100,
  done: 100,
};
const beansPerRowOptions = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 500, 1000];
const containerPad = 100;

// register dom elements
const todoEl = document.getElementById('todo');
const doneEl = document.getElementById('done');

// derive values
const availableGridWidth = todoEl.offsetWidth - containerPad;
const maxCount = Math.max(count.todo, count.done);
const idealSquareLength = Math.sqrt(maxCount);
const beansPerRow = beansPerRowOptions.reduce((prev, curr) => {
  return (Math.abs(curr - idealSquareLength) < Math.abs(prev - idealSquareLength) ? curr : prev);
}) || 10;

const columnCount = Math.max(count.todo, count.done) / beansPerRow;
const beanSize = availableGridWidth / Math.max(beansPerRow, columnCount);
const gridStyle =`
  height: ${availableGridWidth}px;
  width: ${availableGridWidth}px;
`; 
todoEl.style.cssText = gridStyle;
doneEl.style.cssText = gridStyle;

// render todo beans
let todoBeanEls = [];
Array(count.todo).fill().map((_, i) => {
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
  todoBeanEls.push(beanEl);
});
todoEl.append(...todoBeanEls);

// render done beans
let doneBeanEls = [];
Array(count.done).fill().map((_, i) => {
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
  doneBeanEls.push(beanEl);
});
doneEl.append(...doneBeanEls);
