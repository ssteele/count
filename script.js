import { getDomElements } from '/dom.js';
import { clearBeans, renderSelector } from '/count.js';

import { sandbox } from '/apps/sandbox.js';
import { schoolDays } from '/apps/school-days.js';

const { appSelector } = getDomElements();

const apps = [
  { label: 'Sandbox', value: 'sandbox' },
  { label: 'School Days', value: 'school-days' },
]
renderSelector(apps);

appSelector.addEventListener('change', (event) => {
  const selectedApp = event.target?.value;
  if (!selectedApp) {
    return;
  }

  clearBeans();
  switch (selectedApp) {
    case 'sandbox':
      sandbox();
      break;
    case 'school-days':
      schoolDays();
      break;
  }
});

sandbox();
// schoolDays();
