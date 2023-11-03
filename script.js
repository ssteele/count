
// fixed
const counts = {
  todo: 80,
  done: 100,
};
// const initialBeansPerRow = 10;
const beansPerRow = 10;
const containerPad = 100;

// register dom elements
const todoEl = document.getElementById('todo');
const doneEl = document.getElementById('done');

// derive sizes
const availableGridWidth = todoEl.offsetWidth - containerPad;
const columnCount = Math.max(counts.todo, counts.done) / beansPerRow;
const beanSize = availableGridWidth / Math.max(beansPerRow, columnCount);
const gridStyle =`
  height: ${availableGridWidth}px;
  width: ${availableGridWidth}px;
`; 
todoEl.style.cssText = gridStyle;
doneEl.style.cssText = gridStyle;

// render beans: todo
let todoBeanEls = [];
Array(counts.todo).fill().map((_, i) => {
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

// render beans: done
let doneBeanEls = [];
Array(counts.done).fill().map((_, i) => {
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
