const MODULE_RESOLVER = [
  "module-resolver",
  {
    extensions: [".ts", ".tsx", ".native.ts", ".native.tsx", ".android.ts", ".android.tsx", ".ios.ts", ".ios.tsx"],
    alias: {
      "@src": "./src",
    },
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [MODULE_RESOLVER],
    presets: ["babel-preset-expo"],
    env: {
      production: {
        /** adds babel-plugin-module-resolver to get alias paths to imports together with tsconfig.json */
        plugins: ["react-native-paper/babel", MODULE_RESOLVER],
      },
    },
  };
};
