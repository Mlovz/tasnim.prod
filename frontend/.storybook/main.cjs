const path = require("path");
const tsconfigPaths = require("vite-tsconfig-paths").default;

const svgr = require("vite-plugin-svgr");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-svgr-react-component"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": false
  },

  viteFinal: async (config) => {
    config.plugins = [
      ...config.plugins,
      svgr({
        svgrOptions: {
        },
      }),
      tsconfigPaths({
        // My tsconfig.json isn't simply in viteConfig.root,
        // so I've passed an explicit path to it:
        projects: [path.resolve(path.dirname(__dirname), "", "tsconfig.json")],
      })
    ];

    return config;
  },

}