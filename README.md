### Getting Started

These instructions will guide you in how to install and run application, as well as how to run e2e testing
Prerequisites.

The aim of this application is to make everything happen by only using Vanilla JS and this is the why I am not using any other framework or library.

### Notes

* This app is only used for demonstration. Currently I am working to make this app better.
* Grunt is used just for serving app by now. Soon it will be enriched and improved.
* E2E test is just for sample. It needs to be improved.
* **Feel free to make any comments concerning the code. I want to become better!**

### Upcoming tasks
* Replace grunt with webpack
* Add debounce / throttling when searching for movies
* Add a movie interface
* Find better way to access DOM because getElementById is expensive
* Make app more responsive
* Make more use of ES6
* Re-examine the relation between the components and make some code more reusable

### System requirements

* ```node```   
* ```grunt-cli```   

### Installing

A step by step installation process

* Clone remote repository to local PC   
  ```git clone https://github.com/IoannisDrim/movies-js-demo-app.git```
* Browse to root directory
* Open a CMD
* Type ```npm install``` to fetch project dependancies
* Type ```grunt serve``` to launch project locally on port 9000

*_Make sure that no other app is running in localhost:9000. If another app is running and you don't want to close it, then please open Gruntfile.js and find "connect" configuration. Then change port to whatever you want. Please take note that in this case, port should be also changed in cypress.json_     
   
### Running the tests

App has a sample of e2e testing concerning the "In Theaters" page

To run e2e test type in CMD

```npm run test-e2e```

*```grunt serve```_should be running during tests_   

### Technologie Used

* HTML5
* CSS3
* Vanilla JS
* Bootsrap 4
* Grunt
* JQuery ( **only** for supporting Bootsrap )
* Cypress (e2e tests)
* Git

### Authors

* **IoannisDrim**
