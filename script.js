import { getDomElements } from '/dom.js';
import { clearBeans, renderSelector } from '/count.js';

import { sandbox } from '/apps/sandbox.js';
import { schoolDays } from '/apps/school-days.js';

const appTriggerMap = {
  sandbox,
  schoolDays,
};

const appOptions = [
  { label: 'School Days', value: 'schoolDays' },
  { label: 'Sandbox', value: 'sandbox' },
]
renderSelector(appOptions);

const loadApp = (trigger = '') => {
  if (!!trigger && appOptions.map(app => app.value).includes(trigger)) {
    clearBeans();
    appTriggerMap[trigger]();
  }
}

const { appSelector } = getDomElements();
appSelector.addEventListener('change', (event) => {
  const appOption = event.target?.value;
  if (!appOption) {
    return;
  }
  loadApp(appOption);
});

loadApp(appOptions[0].value);
