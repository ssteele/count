import { getDomElements } from '/dom.js';
import { clearBeans, renderSelector } from '/count.js';

import { sandbox } from '/apps/sandbox.js';
import { schoolDays } from '/apps/school-days.js';

// define apps
const appTriggerMap = {
  sandbox,
  schoolDays,
};

let appOptions = [
  { label: 'School Days', value: 'schoolDays' },
  { label: 'Sandbox', value: 'sandbox' },
]

const isApp = (trigger = '') => {
  return !!trigger
    && appOptions.map(app => app.value).includes(trigger)
    && !!appTriggerMap[trigger];
}

// check query params for current app selection
const queryParams = new URLSearchParams(window.location.search);
const appParam = queryParams.get('app');
let currentApp = isApp(appParam) ? appParam : appOptions[0].value;

const selectAppOption = ({ currentApp, appOptions }) => {
  return appOptions.map(option => {
    option.selected = false;
    if (currentApp === option.value) {
      option.selected = true;
    }
    return option;
  });
}

appOptions = selectAppOption({ currentApp, appOptions })
renderSelector(appOptions);

const loadApp = (trigger = '') => {
  if (isApp(trigger)) {
    clearBeans();
    appTriggerMap[trigger]();
  }
}

const { appSelector } = getDomElements();
appSelector.addEventListener('change', (event) => {
  currentApp = event.target?.value;
  if (!currentApp) {
    return;
  }
  loadApp(currentApp);

  // update app query param
  queryParams.set('app', currentApp);
  window.location.search = queryParams.toString();
});

loadApp(currentApp);
