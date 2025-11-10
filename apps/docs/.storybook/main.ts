import { dirname, join, resolve } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tailwind from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";
// import AddonEssentials from "@storybook/addon-essentials";

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../stories/*.stories.tsx",
    "../stories/**/*.stories.tsx",
    "../stories/**/*.mdx",
  ],
  addons: [
    // getAbsolutePath("@storybook/addon-links"),

    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config) {
    // customize the Vite config here
    return mergeConfig(config, {
      plugins: [tailwind()],
      css: {
        postcss: {
          plugins: [autoprefixer()],
        },
      },
      define: { "process.env": {} },
      resolve: {
        alias: [
          // {
          //   find: "ui",
          //   replacement: resolve(__dirname, "../../../packages/ui/"),
          // },
        ],
      },
    });
  },
};

export default config;
