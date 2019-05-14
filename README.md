# YASGUI-ShowIncipits
Quick and dirty user script (a.k.a. Greasemonkey script) to turn PAE incipits retrieved with YASGUI (e.g. from RISM) into nice Verovio renderings

## Install:
1. Install a userscript browser extension:
  * Greasemonkey (Firefox): https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
  * Tampermonkey (Chrome et al): https://www.tampermonkey.net/
  (n.b. only tested with Greasemonkey / Firefox)
  
2. Open the raw YASGUI-ShowIncipits userscript in your browser: https://github.com/musicog/YASGUI-ShowIncipits/raw/master/YASGUI-ShowIncipits.user.js

3. You should get a pop-up asking you to install the user script. Do so. 

## Usage:
1. Go to http://yasgui.org using the browser on which you've installed the user script.
2. Specify https://data.rism.info/sparql (or any endpoint that has PAE incipits) as the SPARQL endpoint at the top
3. Write a SPARQL query that selects PAE strings into a variable called ?incipit. Example query:
`PREFIX dcterm: <http://purl.org/dc/terms/>
PREFIX bsbM: <http://bsb-muenchen.de/ont/bsbMusicOntology#>
SELECT DISTINCT ?work ?title ?incipitPAE ?incipit where {
      ?work dcterm:title ?title ;
            bsbM:incipit ?incipit .
      BIND(?incipit as ?incipitPAE) .
}
limit 50`
4. Ensure that "Table" is selected as the results format. Within a second of the results loading, you should see the PAE in the "incipit" column replaced with an equivalent Verovio rendering.

More on Verovio and PAE: https://www.verovio.org/pae-examples.xhtml
