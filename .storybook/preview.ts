import type { Preview } from '@storybook/vue3';
import PrimeVue from 'primevue/config';
import { setup } from "@storybook/vue3"
import "/public/themes/saga-green/theme.css"
import '@/assets/styles.scss';
import InputText from 'primevue/inputtext';

setup((app) => {
  app.use(PrimeVue, {ripple:true});
  app.component('InputText', InputText)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
