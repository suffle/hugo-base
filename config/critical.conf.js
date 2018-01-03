const config = {
  inline: true,
  minify: true,
  dimensions: [
    //iPhone sizes
    {
      width: 320,
      height: 640
    },
    {
      width: 480,
      height: 360
    },

    // iPad including BP 992
    {
      width: 768,
      height: 1024
    },
    {
      width: 1024,
      height: 768
    },

    // Desktop sizes
    {
      width: 1366,
      height: 768
    },
    {
      width: 1200,
      height: 900
    }
  ]
};

export default config;
