#Eezer admin dashboard
-----------------

This app is based on [Nebular](https://akveo.github.io/nebular/), and deployed by [Headlight](http://headlight.se/)

##[Server Deployment](https://akveo.github.io/nebular/docs/guides/server-deployment#server-deployment)
-----------------

Though in the development Nebular app consists of a number of TypeScript, SASS, etc files, the built package is just a bunch HTML/JavaScript/CSS files. No other processing is needed to get them running in a browser. So to deploy the app you basically need two simple steps:

* Build your app with npm run build:prod

* Copy the output from the dist folder under a web-server of your choice.


More details on how to setup your web-server to better serve the application can be found on Angular Documentation website, under Server Configuration [section.](https://angular.io/guide/deployment#server-configuration)
