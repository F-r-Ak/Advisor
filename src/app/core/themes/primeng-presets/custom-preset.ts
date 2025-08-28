import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

export const yellowPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{yellow.800}',
      100: '{yellow.800}',
      200: '{yellow.800}',
      300: '{yellow.800}',
      400: '{yellow.800}',
      500: '{yellow.800}',
      600: '{yellow.800}',
      700: '{yellow.800}',
      800: '{yellow.800}',
      900: '{yellow.800}',
      950: '{yellow.800}'
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    }
  }
});
