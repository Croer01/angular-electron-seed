#Angular Electron Seed

Is a seed to help me create cross platform apps using Angular (2).

#Installation

Install Node.js (high recommend v6.6.0 above) and [nvm](http://nvm.sh/) to manage multiple Node versions

Execute next command in root of your project.

`npm install`

#Use Gulp

This seed use Gulp to automatize repetitive tasks. This is the list of commands:

- **ts**: transpile TypeScript.
- **templates**: move all templates to electron detect.
- **clean**: remove folders used by Gulp tasks.
- **build**: generate dist folder used by electron app.
- **app:live-reload**: this task automaticaly refresh dist folder if any original ts or html file change (ideal for develop) and rerun electron application.
- **app:run**: this task generate dist folder and run electron application.


#Run app

first need generate app files, we can use `gulp build` or `gulp watch`.  
Then use `node start` to run app.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />Este obra está bajo una <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">licencia de Creative Commons Reconocimiento-CompartirIgual 4.0 Internacional</a>.
