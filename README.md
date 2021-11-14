Help + Testing
The steps below will take you all the way through Cypress. It is assumed you have nothing installed except for node + git.

If you get stuck, here is more help:

Requires:
    node
    npm
    git

Setup:
    clone: git@github.com:Kenitsa/testPecode.git
    install: npm i

Dependencies: 
    "cypress": "^9.0.0",
    "cypress-multi-reporters": "^1.5.0",
    "git": "^0.1.5",
    "mocha": "^9.1.3",
    "mochawesome": "^7.0.1",
    "mochawesome-merge": "^4.2.0",
    "mochawesome-report-generator": "^6.0.1",
    "chai": "^4.3.4"
Run Them Tests
     run cypress: npx cypress run
     open cypress: npx cypress open
     generate mochawesome report: npm test   
