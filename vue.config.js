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
    member: {
      entry: "src/pages/member/member.js",
      template: "public/member.html",
      filename: "member.html",
      title: "Member",
      chunks: ["chunk-vendors", "chunk-common", "member"],
    },
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "iSMusic",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  // devServer: {
  //   port: "8080",
  //   https: true,
  // },
});
