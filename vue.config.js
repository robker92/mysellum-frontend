module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {},
      },
    },
  },

  /**
   * Deployment:
   * If you are deploying to https://<USERNAME>.github.io/, you can omit publicPath as it defaults to "/".
   * If you are deploying to https://<USERNAME>.github.io/<REPO>/, (i.e. your repository is at
   * https://github.com/<USERNAME>/<REPO>), set publicPath to "/<REPO>/". For example, if your repo name is "my-project",
   * your vue.config.js should look like this: process.env.NODE_ENV === "production" ? "/my-project/" : "/"
   */
  // publicPath: "/project-frontend/"
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  //process.env.NODE_ENV === "production" ? "/my-project/" : "/"
};
