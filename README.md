# await-catched
Smart async-await error handling.

> Minimize the amount of code you need to write to handle errors.

## Installation

```bash
yarn add await-catched
npm i await-catched --save
```

## Examples

```javascript
import { catched } from 'await-catched';


// example with throw
async function login({ username, email, password }) {
    const user = await catched(User.find({ email }), e => {
        throw new Error('No user found');
    });

    const match = await catched(user.comparePassword(password));
    if(!match) throw new Error('Wrong password');

    const token = await catched(user.generateAuthToken(), e => {
        throw new Error('Failed to save the user');
    });

    return token;
}

// example with a callback
async function login({ username, email, password }, cb) {
    const user = await catched(User.find({ email }), e => cb('No user found'));

    const match = await catched(user.comparePassword(password));
    if(!match) cb('Wrong password');

    const token = await catched(
        user.generateAuthToken(), 
        e => cb('Failed to save the user')
    );

    return token;
}
```


## API

`catched([promises], handler)`

| Argument   | Description                                                                                                                                          | Type        |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|:------------|
| `promises` | Can be either a single promise or an array of promises. If its an array it will get piped into `Promise.all`.                                        | `[Promise]` |
| `handler`  | An optional handler which only gets called if one or more promises reject. It gets called with the error object which caused the promises to reject. | `Function`  |

The `catched` function returns the results of the promises that you passed to it - for a single promise this will end up in a single value - otherwise you can expect to get an array of results back. In case of an error it returns `null`.

## Purpose

**await-catched** is designed to be a small and easy to use alternative to the well known [await-to-js](https://github.com/scopsy/await-to-js) error handling library. 

### await-catched vs await-to-js

The main difference between [await-to-js](https://github.com/scopsy/await-to-js) and **await-catched** is the way that these two libraries are designed. While [await-to-js](https://github.com/scopsy/await-to-js) aims to handle errors like you would do in a go-lang programm, **await-catched** focuses on ease of use and modern api design.

> The primary design goal is to minimize the amount of code you need to write to handle errors.

## License
MIT © Maximilian Schulke