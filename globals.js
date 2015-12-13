//////////////REQUIRED FOR USING YODLEE
//cobrand login and cobrandpassword is the first authentication to verify your app with Yodlee
// this gets the token session


//then you need the userLogin and the userPassword, which is the particular user that you want to query from
//this gets the user token session
var cobSessionToken = '';
var userSessionToken = '';
var cobrandLogin = '';
var cobrandPassword = '';

//to a certain date , refer to https://devnow.yodlee.com/apidocs/index.html for the full request url
//the object exported has example queries set as transactions and accounts
// options.url also is set to the transactions query
var queryTransactions = '';

module.exports = {
  username : '',
  password : '',
  cobrandLogin  : cobrandLogin,
  cobrandPassword  : cobrandPassword,
  baseUrl : 'https://developer.api.yodlee.com:443/ysl/restserver/v1/',
  cobrandLoginURL : 'cobrand/login',
  userLoginURL : 'user/login',
  transactions : 'https://developer.api.yodlee.com:443/ysl/restserver/v1/transactions?toDate=2015-12-03&&&',
  accounts : 'https://developer.api.yodlee.com:443/ysl/restserver/v1/accounts',
  options : {
    url: 'https://developer.api.yodlee.com:443/ysl/restserver/v1/transactions?toDate=2015-12-03&&&',
    method:  'GET',
    headers: {Authorization : "{cobSession=" + cobSessionToken + "," + "userSession=" + userSessionToken + "}"},
    form: ''
  },
  headers: {
			'User-Agent':            'Mozilla/5.0',
			'Content-Type':          'application/json',
			'encoding':				 'utf8'
		},
  cobSessionToken : cobSessionToken,
  userSessionToken : userSessionToken
}
