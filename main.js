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
    result = {}
    result.city = $("tbody tr:nth-of-type(28) th span").text();
    result.value = $("tbody tr:nth-of-type(28) td:nth-of-type(4)").text();
    // result.updated = new Date(); // disable keep commits low
    fs.writeFile('resources/incidences.json', JSON.stringify(result), e => console.error(e));
  }
);
