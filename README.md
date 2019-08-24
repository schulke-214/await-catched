# catched
Smart async-await error handling.

> Minimize the amount of code you need to write to handle errors.


## Installation

```bash
$ yarn add catched -S
$ npm i catched -S
```

## Examples

```javascript
import { catched } from 'catched';


// example with throw
async function login({ username, email, password }) {
    const user = await catched(User.find({ email }), e => {
        throw new Error('No user found');
    });

    const match = await catched(user.comparePassword(password)) || false;
    if(!match) throw Error('Wrong password');

    const token = await catched(user.generateAuthToken(), e => {
        throw new Error('Failed to save the user');
    });

    return token;
}

async function login({ username, email, password }, cb) {
    const user = await catched(User.find({ email }), e => cb('No user found'));

    const match = await catched(user.comparePassword(password)) || false;
    if(!match) cb('Wrong password');

    const token = await catched(user.generateAuthToken(), e => cb('Failed to save the user'));

    return token;
}
```


## API

## Purpose

**catched** is designed to be a small and easy to use alternative to the well known [await-to-js]() error handling library. 

### catch vs await-to-js

The main difference between [await-to-js]() and **catched** is the way that these two libraries are designed. While [await-to-js]() aims to handle errors like you would do in a go-lang programm, **catched** focuses on the code that you write. 

> The primary design goal is to minimize the amount of code you need to write to handle errors.

------------
| lol | xd |
|-----|----|
|rofl| mehr |
------------



### catch