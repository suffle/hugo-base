const defaultConf = {
  extends: "lighthouse:default",

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [],

  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    mysite: {
      name: "Default site metrics",
      description: "Metrics for our super awesome site",
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
      ]
    }
  }
};

module.exports = defaultConf;
