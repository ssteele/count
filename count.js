
import { BEANS_PER_ROW_OPTIONS, CONTAINER_PAD } from './constants.js';
import { getDomElements } from './dom.js';

// register dom elements
const { todoEl, doneEl } = getDomElements();

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

// render beans
export const renderBeans = ({
    count,
    label,
}) => {
    // derive values
    const availableGridWidth = todoEl.offsetWidth - CONTAINER_PAD;
    const maxCount = Math.max(count.todo, count.done);
    const idealSquareLength = Math.sqrt(maxCount);
    const beansPerRow = BEANS_PER_ROW_OPTIONS.reduce((prev, curr) => {
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
