const { ProvidePlugin, DefinePlugin } = require("webpack");

module.exports = function (config, env) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.m?[jt]sx?$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.m?[jt]sx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    plugins: [
      ...config.plugins,
      new ProvidePlugin({
        process: "process/browser",
      }),
      new DefinePlugin({
        __DEPLOYMENT_ENV__: JSON.stringify(process.env.DEPLOYMENT_ENV),
      }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        url: require.resolve("url/"),
        zlib: require.resolve("browserify-zlib"),
        vm: false,
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};
