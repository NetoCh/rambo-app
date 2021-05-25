const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000"
      }
    }
  }
};
