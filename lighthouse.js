const lighthouse = require("lighthouse");
const ReportGenerator = require("lighthouse/lighthouse-core/report/v2/report-generator");
const logger = require("lighthouse-logger");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const path = require("path");
const opn = require("opn");

const defaultConf = require("./config/lighthouse.conf");
// const defaultConf = require("lighthouse/lighthouse-core/config/default");

function runLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch(flags).then(chrome => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results)
    );
  });
}

const flags = {
  chromeFlags: ["--headless"],
  output: "html",
  logLevel: "info",
  view: true,
  auditMode: true
};

logger.setLevel(flags.logLevel);

const generateFilename = (mode = "html") => {
  const date = new Date();
  const timeStr = date.toLocaleTimeString("de-DE", { hour12: false });
  const dateParts = date
    .toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .split("/");
  dateParts.unshift(dateParts.pop());
  const dateStr = dateParts.join("-");

  return `report_${dateStr}_${timeStr}.${mode}`;
};

const generateOutput = (results, config, mode = "html") => {
  const generator = new ReportGenerator();

  if (mode === "json") {
    return JSON.stringify(results, null, 2);
  } else {
    return generator.generateReportHtml(results);
  }
};

runLighthouse("https://viebrockhaus.de", flags, defaultConf).then(results => {
  const cwd = process.cwd();
  const extension = flags.output || "html";

  const fileName = generateFilename(flags.output);
  const filePath = flags.outputPath || "./reports";
  const resultFile = path.join(cwd, filePath, fileName);
  const artifacts = results.artifacts;
  delete results.artifacts;
  const content = generateOutput(results, defaultConf, flags.output);

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  fs.writeFile(resultFile, content, err => {
    if (err) {
      logger.error("performance-Check: ", err);
    } else {
      logger.log(
        "Performance-Check: ",
        `Report written as ${extension} to ${resultFile}`
      );

      if (flags.view) {
        opn(resultFile, { wait: false });
      }
    }
  });
});
