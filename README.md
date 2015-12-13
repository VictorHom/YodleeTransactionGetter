===Yodlee API helper ===

This npm module will let you grab amount of money spent on transactions, filtered by category.

## Installation

```sh
$ npm install --save yodlee-transactions
```

## Usage

```js
var yodlee = require('yodlee-transactions');
```


## Authentication using Cobrand Credentials
Yodlee requires a cobSessionToken before we can access the API. Get your credentials [here](https://devnow.yodlee.com).

Yodlee uses the standard oauth authentication flow in order to allow apps to act on a user's behalf. The API provides a convenience method to help you authenticate your users.

below snippet returns a promise of user spending { Credit: {category: amt} , { Debit: {category: amt}}}
```js
yodlee.getTransactions(
  cobrandLogin,
  cobrandPassword,
  userName,
  userPassword
);
```

## Using the API
### GET User Accounts
Returns the information related to the specified accounts aggregated by the User: [Yodlee Docs](https://developer.yodlee.com/Aggregation_API/Aggregation_Services_Guide/Aggregation_REST_API_Reference/getSiteAccounts)


## Next Steps
- get specific accounts
- get better accounting filter functions
