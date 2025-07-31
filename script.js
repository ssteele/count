import { getDomElements } from '/dom.js';
import { clearBeans, renderSelector } from '/count.js';

import { sandbox } from '/apps/sandbox.js';
import { aisdDays2025_2026 } from '/apps/aisd-days-2025-2026.js';
import { mvDays2024_2025 } from '/apps/mv-days-2024-2025.js';

// define apps
const appTriggerMap = {
  aisdDays2025_2026,
  mvDays2024_2025,
  // sandbox,
};

let appOptions = [
  { label: 'Ridgetop', value: 'aisdDays2025_2026' },
  { label: 'Mundo Verde', value: 'mvDays2024_2025' },
  // { label: 'Sandbox', value: 'sandbox' },
]

let queryParams = new URLSearchParams(window.location.search);

const isApp = (trigger = '') => {
  return !!trigger
    && !!appTriggerMap[trigger];
}

const selectAppOption = ({ app, appOptions }) => {
  return appOptions.map(option => {
    option.selected = false;
    if (app === option.value) {
      option.selected = true;
    }
    return option;
  });
}

const loadApp = (trigger = '') => {
  if (isApp(trigger)) {
    clearBeans();
    appTriggerMap[trigger]();
  }
}

const load = (app = '') => {
  appOptions = selectAppOption({ app, appOptions })
  renderSelector(appOptions);

  loadApp(app);
}

const { appSelector } = getDomElements();
appSelector.addEventListener('change', (event) => {
  const app = event.target?.value;
  if (!app) {
    return;
  }

  // update app query param
  queryParams.set('app', app);
  window.location.search = queryParams.toString();

  load(app);
});

const init = () => {
  // check query params for current app selection
  const appParam = queryParams.get('app');
  const app = isApp(appParam) ? appParam : appOptions[0].value;

  load(app);
}
init();
