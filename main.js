const cheerio = require("cheerio");
const { fetch } = require("./scrapers/index.js");
const fs = require('fs');


fetch(
  "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/salud/static/resultadosProvincialesCovid.html?prov=29",
  error => {
    console.log(error);
  },
  html => {
    const $ = cheerio.load(html);
    result = [{
      city: $("tbody tr:nth-of-type(1)  th span").text(),
      value: $("tbody tr:nth-of-type(1)  td:nth-of-type(4)").text()
    },{
      city: $("tbody tr:nth-of-type(28) th span").text(),
      value: $("tbody tr:nth-of-type(28) td:nth-of-type(4)").text(),
    }];
    fs.writeFile('resources/incidences.json', JSON.stringify(result, null, 2), e => console.error(e));
  }
);
