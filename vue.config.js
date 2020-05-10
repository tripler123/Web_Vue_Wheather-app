module.exports = {
    css: {
        loaderOptions: {
          sass: {
            data: `
                  @import "./src/assets/sass/_variables.scss";
                  `
          }
        }
      },
};