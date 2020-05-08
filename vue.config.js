module.exports = {
  pwa: {
    name: 'Curry & Fritz',
    short_name: 'Curry & Fritz',
    themeColor: '#ffffff',
    msTileColor: '#333333',
    background_color: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      msTileImage: 'img/icons/mstile-144x144.png'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/mixins/_collapsible.scss";
          @import "@/scss/mixins/_breakpoints.scss";
          @import "@/scss/variables/_colors.scss";
          @import "@/scss/variables/_timing.scss";
          @import "@/scss/variables/_typography.scss";
          @import "@/scss/extends/_buttons.scss";
        `,
      },
    },
  },
};
