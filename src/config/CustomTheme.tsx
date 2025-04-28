// Theme.tsx

import { Theme } from '@aws-amplify/ui-react';

const CustomTheme: Theme = {
  name: 'heading-theme',
  tokens: {
    components: {
      heading: {

        1: { // Estilos específicos para <h1>
          fontSize: { value: '{fontSizes.xxl}' },
          fontWeight: { value: '{fontWeights.bold}' },
        },
        2: { // Estilos específicos para <h2>
          fontSize: { value: '{fontSizes.xl}' },
          fontWeight: { value: '{fontWeights.normal}' },
        },
      },
    },
  },
};

export default CustomTheme;
