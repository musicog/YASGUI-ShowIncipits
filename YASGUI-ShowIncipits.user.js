// ==UserScript==
// @name YASGUI-Verovio
// @description  Render incipits and score images in YASGUI
// @author David M. Weigl
// @homepageURL https://github.com/musicog/YASGUI-ShowIncipits
// @version  1
// @run-at document-idle
// @include  http://yasgui.org/*
// @include  https://yasgui.org/*
// @require  http://www.verovio.org/javascript/latest/verovio-toolkit.js
// ==/UserScript==

const vrvOptions = {
  inputFormat: 'pae',
  pageHeight: 2970,
  pageWidth: 1400,
  spacingStaff: 0,
  border: 20,
  adjustPageHeight: 1,
  scale: 45
};
var vrvToolkit = new verovio.toolkit();
tick();

function tick() { 
	// if this page contains table headers (e.g. of the YASGUI results table)
  const tableHeaders = document.querySelectorAll("th.sorting");
  if(tableHeaders.length) {
    // try and find a column header called "incipit"
    let incipitColumnIndex;
    tableHeaders.forEach( (header, index) => {
      if(header.firstChild.innerText === "incipit") { 
        // found one! remember its column index
        incipitColumnIndex = index;
      }
    });
    if(incipitColumnIndex) { 
      // if we found an incipit column ...
      // work through all the rows
      const rows = document.querySelectorAll("tr"); 
      rows.forEach( (row, index) => { 
        if(index === 0) { return } // skip header row
        // grab the incipit column's contents
         const incipitCell = row.children.item(incipitColumnIndex+1);
        if(incipitCell.firstChild.nodeName === "svg") { 
          // we've already converted this one, so skip ahead
          return 
        }
        // ask Verovio to make us an SVG
        incipitCell.innerHTML = vrvToolkit.renderData(
          "@clef:G-2\n\@keysig:\n\@timesig:\n\@data:" + 
          row.children.item(incipitColumnIndex+1).innerText + "\n", 
          vrvOptions
        );

        // extract the MEI data from Verovio Toolkit and append it to the row
        const meiData = vrvToolkit.getMEI();
      })
    }
  } 
  // repeat every second (so that we can catch the results of a new query)
  setTimeout( () => { tick() }, 1000);
}
