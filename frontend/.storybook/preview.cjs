import { addDecorator } from '@storybook/react';
import { StyleDecorator } from "../src/shared/config/storyDecorator/StyleDecorator/StyleDecorator";
import { RouterDecorator } from "../src/shared/config/storyDecorator/RouterDecorator/RouterDecorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


addDecorator(StyleDecorator);
addDecorator(RouterDecorator);  