const cheerio = require("cheerio");
const { fetch } = require("./scrapers/index.js");
const fs = require('fs');


fetch(
  "https://corissia.com/de/coronavirus",
  error => {
    console.log(error);
  },
  html => {
    const $ = cheerio.load(html);
    let element = $('div.col2-4')[1];
    element = $('span.f-14.w-600', element)[1].parent;
    result = [{
      region: "Kreta",
      label: "14 Tage Inzidenz",
      value: element.childNodes[2].data.trim(),
    }];
    fs.writeFile('resources/kreta.json', JSON.stringify(result, null, 2), e => console.error(e));
  }
);

fetch(
  "https://www.corona-in-zahlen.de/weltweit/griechenland/",
  error => {
    console.log(error);
  },
  html => {
    const $ = cheerio.load(html);
    let element = Array.from($('div.h-100'))[3];
    element = $('p', element);
    result = [{
      region: "Griecheland",
      label: "7 Tage Inzidenz",
      value: element[0].childNodes[0].children[0].data.trim(),
    }];
    fs.writeFile('resources/griechenland.json', JSON.stringify(result, null, 2), e => console.error(e));
  }
);
