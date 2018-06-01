# Edelfelt

Visualisering av data om konstnären [Albert Edelfelt](https://sv.wikipedia.org/wiki/Albert_Edelfelt). Baserat på information från [Svenska Litteratursällskapets](http://www.sls.fi/) [API om Edelfelt](http://edelfelt.sls.fi/apiinfo/).

Skrivet i [Javascript](http://www.w3schools.com/js/). Använder följande bibliotek:
* [Angular](https://angularjs.org/)
* [jQuery](https://jquery.com/)
* [vis.js](http://visjs.org/)
* [amCharts](https://www.amcharts.com/)
* [noUiSlider](http://refreshless.com/nouislider/)

En version av visualiseringen kan kollas in [här](http://gellati.github.io/edelfelt).


***

Visualisation about the Finnish artist [Albert Edelfelt](https://en.wikipedia.org/wiki/Albert_Edelfelt). Based on the [Edelfelt API](http://edelfelt.sls.fi/apiinfo/) by the [Society of Swedish Literature in Finland](http://www.sls.fi/en).

A version of the visualisation can be browsed [here](http://gellati.github.io/edelfelt).

## Local setup

Clone the repository. The `package.json` file contains necessary dependencies. Install them with

    npm install

This is however not necessary, as the `index.html` file contains links to CDN libraries.

The project can be run locally from the `index.html` file, e.g. with

    python -m SimpleHTTPServer

which should open a local instance which can be viewed in the browser at `localhost:8000`


### Other

Edelfelt API uses `http`, while GitHub uses mainly `https`, but can also use `http`. Because the browser will otherwise give warnings about [mixed active content](https://stackoverflow.com/questions/18251128/why-am-i-suddenly-getting-a-blocked-loading-mixed-active-content-issue-in-fire?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa), the initial "https|http" has been removed in the url. In my view `https` is good for privacy, but not if information should be accessible to everyone. Github demo page is via `http`.
