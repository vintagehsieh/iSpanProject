const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "dist",
  // assertDir: "",
  indexPath: "index.html",
  pages: {
    music: {
      entry: "src/pages/music/music.js",
      template: "public/music.html",
      filename: "music.html",
      title: "Music",
      chunks: ["chunk-vendors", "chunk-common", "music"],
    },
    shop: {
      entry: "src/pages/shop/shop.js",
      template: "public/shop.html",
      filename: "shop.html",
      title: "Shop",
      chunks: ["chunk-vendors", "chunk-common", "shop"],
    },
    activity: {
      entry: "src/pages/activity/activity.js",
      template: "public/activity.html",
      filename: "activity.html",
      title: "Activity",
      chunks: ["chunk-vendors", "chunk-common", "activity"],
    },
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Index",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  // devServer: {
  //   host: "localhost",
  //   port: "8080",
  //   https: false,
  //   hotOnly: true,
  //   open: false,
  //   historyApiFallback: {
  //     index: "/index.html",
  //   },
  // },
});
