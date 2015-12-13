//testing only performed on Chrome Version 46.0.2490.86 (64-bit)
var globals = require('./globals');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

module.exports = {
  getCobSession : getCobSession,
  getUserSession : getUserSession,
  getAccounts : getAccounts,
  getTransactions : getTransactions,
  getCategorySpending : getCategorySpending,
  globals : globals
};

//currently only working on USD
function getCategorySpending(yodleeTransactionObj) {
  var ts = yodleeTransactionObj.transaction;
  var result = {};
  //make this more concise
  ts.forEach(function(obj){
    var baseType = obj.baseType;
    var amount = obj.amount.amount;
    var category = obj.category;

    if (!(result[baseType])) {
      result[baseType] = {};
    };

    if (!(result[baseType][category])) {
      result[baseType][category] =  0;
    }
    result[baseType][category] = result[baseType][category] + amount;
  });
  return result; //{Debit: {category1: amt, category2: amt } , Credit: {category1: amt, category2: amt } }
}

//return the Cob Session Token
function getCobSession(cobrandLogin, cobrandPassword) {
  globals.options.method = 'POST';
  globals.options.url = globals.baseUrl + globals.cobrandLoginURL; //https://developer.api.yodlee.com:443/ysl/restserver/v1/cobrand/login
  globals.options.headers = globals.headers;
  globals.options.form = {
    cobrandLogin : cobrandLogin,
    cobrandPassword : cobrandPassword
  }

  //return promise of token session else return error
  return request(globals.options).then(function(response){
    return response.body;
  }).catch(function(e){
    console.error(e);
  });
}

//return the User Session Token
function getUserSession(cobSessionToken, userName, userPassword) {
  globals.options.method = 'POST';
  globals.options.url = globals.baseUrl + globals.userLoginURL; //https://developer.api.yodlee.com:443/ysl/restserver/v1/user/login
  globals.options.headers = globals.headers;
  globals.options.headers.Authorization = 'cobSession=' + cobSessionToken;
  globals.options.form =  {
    userLogin : userName,
    userPassword: userPassword
  }
  return request(globals.options).then(function(response){
    return response.body;
  }).catch(function(e){
    console.error(e);
  });
}

//https://developer.api.yodlee.com:443/ysl/restserver/v1/accounts
function getAccounts(cobSession, userSession){
  var accountOptions = {
    url: 'https://developer.api.yodlee.com:443/ysl/restserver/v1/accounts' ,
    method:  'GET',
    headers: {Authorization : "{cobSession=" + cobSession + "," + "userSession=" + userSession + "}"},
    form: ''
  }
  return request(accountOptions)
    .then(function(response){
      return response.body;
    });
}

//add in additional parameters in the order of
//https://developer.api.yodlee.com:443/ysl/restserver/v1/transactions?fromDate=2014-07-09&toDate=2015-09-19&&&
//https://developer.api.yodlee.com:443/ysl/restserver/v1/transactions?accountId=10177928&fromDate=2014-07-09&toDate=2015-09-19&&&
function getTransactions(cobSession, userSession, accountId, fromDate, toDate) {
  //can make it loop through the arguments to make it work
  var baseTransactionsUrl = 'https://developer.api.yodlee.com:443/ysl/restserver/v1/transactions';
  if(accountId){
    baseTransactionsUrl = baseTransactionsUrl + "?accountId=" + accountId;
  }
  if(fromDate){
    baseTransactionsUrl = baseTransactionsUrl + "?fromDate=" + fromDate;
  }
  if(toDate){
    baseTransactionsUrl = baseTransactionsUrl + "?toDate" + toDate;
  }
  baseTransactionsUrl = baseTransactionsUrl + "???";
  var transactionOptions = {
    url: baseTransactionsUrl,
    method:  'GET',
    headers: {Authorization : "{cobSession=" + cobSession + "," + "userSession=" + userSession + "}"},
    form: ''
  }
  return request(transactionOptions)
    .then(function(response){
      return response.body;
    });
}