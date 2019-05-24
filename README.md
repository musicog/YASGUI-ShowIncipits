# YASGUI-ShowIncipits
Quick and dirty user script (a.k.a. Greasemonkey script) to turn PAE incipits retrieved with YASGUI (e.g. from RISM) into nice Verovio renderings

## Install:
1. Install a userscript browser extension (tested with both):
  * Greasemonkey (Firefox): https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
  * Tampermonkey (Chrome et al): https://www.tampermonkey.net/
  
2. Open the raw YASGUI-ShowIncipits userscript in your browser by clicking on the following link: https://github.com/musicog/YASGUI-ShowIncipits/raw/master/YASGUI-ShowIncipits.user.js

3. You should get a pop-up asking you to install the user script. Do so. 

## Usage:
### with YASGUI
1. Go to http://yasgui.org using the browser on which you've installed the user script. To activate the just installed userscript, it can be necessary to reload the browser window (F5).
2. Specify https://data.rism.info/sparql (or any endpoint that has PAE incipits) as the SPARQL endpoint at the top dropdown
3. Write a SPARQL query that selects PAE strings into a variable called `?incipit`. Example query:
```
PREFIX bsbM: <http://bsb-muenchen.de/ont/bsbMusicOntology#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT DISTINCT ?work ?title ?name ?pae ?incipit 
WHERE {  
  ?work bsbM:incipit ?pae ;
        dcterms:creator ?creator ;
        dcterms:title ?title.
  ?creator foaf:name ?name .
  BIND(?pae as ?incipit) .
} 
LIMIT 50
```
4. Ensure that "Table" is selected as the results format. Within a couple of seconds of the results loading, you should see the PAE in the "incipit" column replaced with an equivalent Verovio rendering. You can specify another query returning incipits and have them rendered to Verovio again, without reloading the page.

More on Verovio and PAE: https://www.verovio.org/pae-examples.xhtml

### with MusicOwl triplestore
1. Go to http://linkeddata.uni-muenster.de:7200/sparql using the browser on which you've installed the user script. To activate the just installed userscript, it can be necessary to reload the browser window (F5).
2. You don't need to specify another endpoint.
3.  Write a SPARQL query that selects musicXML strings into a variable called `?incipit`. Example query:
   ```
   PREFIX mso: <http://linkeddata.uni-muenster.de/ontology/musicscore#>
   PREFIX mo: <http://purl.org/ontology/mo/>
   PREFIX dc: <http://purl.org/dc/elements/1.1/>
   PREFIX foaf: <http://xmlns.com/foaf/0.1/>
   
   SELECT DISTINCT ?name ?score ?title ?musicxml ?incipit
   WHERE {   	
       ?score a mo:Score ;
              mso:asMusicXML ?musicxml ; 
              dc:creator ?creator ;
              dc:title ?title .
       ?creator foaf:name ?name .
       BIND(?musicxml AS ?incipit)
   } LIMIT 1
   ```
   
   As the musicxml files are much larger than a PAE string, you should limit the result number to 1 for now.
   
   4. Ensure that "Table" is selected as the results format. Within a couple of seconds of the results loading, you should see the musicxml in the "incipit" column replaced with an equivalent Verovio rendering. You can specify another query returning incipits and have them rendered to Verovio again, without reloading the page.
