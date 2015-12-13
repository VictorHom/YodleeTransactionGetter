===Yodlee API helper ===

This npm module will let you grab amount of money spent on transactions, filtered by category.

## Installation

```sh
$ npm install --save yodlee-transactions
```

## Usage

```js
//If you look into the node modules and check the test.js file, it will have a test example to work off of.
var yodlee = require('yodlee-transactions');

```


## Authentication using Cobrand Credentials
Yodlee requires a cobSessionToken before we can access the API. Get your credentials [here](https://devnow.yodlee.com).

Yodlee uses the standard oauth authentication flow in order to allow apps to act on a user's behalf. The API provides a convenience method to help you authenticate your users.

below snippet is a starting point on using this module.
```js
var yodlee = require("./index");
var cobrandUser = ""; //example format in sbCobxxxxx
var cobrandPassword = ""; //format is xxxx-xxx-xxx-xxx-xxxx the number of x is not accurate
var userName = ""; //example formats are sbMemxxxxx
var userPassword = ""; //example formate are in sbMemxxxxx
var cobSessionToken = "";
var userSessionToken = "";
var accounts = [];


function generateCobToken(cobrandUser, cobrandPassword){
  return yodlee.getCobSession(cobrandUser, cobrandPassword)
    .then(function(data){
      var dataObj = JSON.parse(data);
      cobSessionToken = dataObj.session.cobSession;
      return cobSessionToken;
    });
}

function generateUserToken(userName, userPassword){
  return function(cobSessionToken){
    return yodlee.getUserSession(cobSessionToken, userName, userPassword)
      .then(function(user){
        var userObj = JSON.parse(user);
        userSessionToken = userObj.session.userSession;
        return userSessionToken;
      });
  }
}

function getAccounts() {
  return yodlee.getAccounts(cobSessionToken, userSessionToken)
    .then(function(data){
      var dataObj = JSON.parse(data);
      accounts = [] //clearing it out kind of
      for (var k in dataObj){
        if (dataObj.hasOwnProperty(k)){
          accounts.push(dataObj[k]);
        }
      }
    })
}

function getTransactions(accountId, fromDate, toDate) {
  return yodlee.getTransactions(cobSessionToken, userSessionToken, accountId, fromDate, toDate)
    .then(function(data){
      return JSON.parse(data);
    })
}

function getCategorySpending(transactionObj) {
  return yodlee.getCategorySpending(transactionObj);
}

//Running here
generateCobToken(cobrandUser, cobrandPassword)
  .then(generateUserToken(userName, userPassword))
  .then(function(){
    getAccounts();
    getTransactions()
      .then(getCategorySpending);
  })
```

## Using the API
### GET User Accounts
Returns the information related to the specified accounts aggregated by the User: [Yodlee Docs](https://developer.yodlee.com/Aggregation_API/Aggregation_Services_Guide/Aggregation_REST_API_Reference/getSiteAccounts)


## Next Steps
- get specific accounts
- get better accounting filter functions
