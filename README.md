# Redux Actions Magic

Syntax magic for the <a href="https://www.npmjs.com/package/redux-actions" target="_blank">redux-actions</a> module, meant to remove repetitive typing of action names, that might slightly reduce development time and bug generation.

This module is experimental and may not work perfectly quite yet :)


## Install

`npm install redux-actions-magic`

Note that this module has a peer dependency for `redux-actions` so you must have that module as a dependecy to your project for it to work.


## Usage

Here's what creating a few actions might look like with redux-actions:

```javascript
// actions.js
import {createAction} from 'redux-actions'

export const ACTION_ONE = 'ACTION_ONE'
export const actionOne = createAction(ACTION_ONE)

export const ACTION_TWO = 'ACTION_TWO'
export const actionTwo = createAction(ACTION_TWO)
```

Then we can handle them in the reducer like this:

```javascript
// reducer.js
import {combineReducers} from 'redux'
import {handleAction} from 'redux-actions'
import * as actions from './actions'

export default combineReducers({
  someState: handleActions({
    [actions.ACTION_ONE] => (state, action) => {
      // where the magic happens
    },
    [actions.ACTION_TWO] => (state, action) => {
      // where the magic happens
    }
  })
})
```

This works fine, but notice we're typing the name of our actions a lot, which gives us a lot of opportunities to make mistakes, especially when we need to rename/refactor our actions as our application grows.

Here's the same functionality with redux-actions-magic:

```javascript
// actions.js
import {createActions} from 'redux-actions-magic'

// create actions returns an object with two props: types and actions
// types is a plain object that looks something like this: { ACTION_ONE: 'ACTION_ONE', .. }
// action is a plain object that looks something like this: { actionOne: func() { /* action func */ } }
// note that createActions will automatically create camelcased action functions based on the action name
const { types, actions } = createActions([
  'ACTION_ONE',
  'ACTION_TWO',
])

export { types, actions as default }
```

Notice we only typed our action names once when defining them, and our action function names were generated automatically from the action type.

Here's how we might use our action in a reducer:

```javascript
// reducer.js
import {combineReducers} from 'redux'
import {handleAction} from 'redux-actions'
import {types as actionTypes} from './actions'

export default combineReducers({
  someState: handleActions({
    [actionTypes.ACTION_ONE] => (state, action) => {
      // where the magic happens
    },
    [actionTypes.ACTION_TWO] => (state, action) => {
      // where the magic happens
    }
  })
})
```

redux-actions-magic also adds a `type` property to our action functions, which we can use with our reducer as an alternative to the `types` property like so:

```javascript
// reducer.js
import {combineReducers} from 'redux'
import {handleAction} from 'redux-actions'
import actions from './actions'

export default combineReducers({
  someState: handleActions({
    [actions.actionOne.type] => (state, action) => {
      // where the magic happens
    },
    [actions.actionTwo.type] => (state, action) => {
      // where the magic happens
    }
  })
})
```


### What about payload/meta creators?

`createActions` takes in array of action types to create action functions from. The action types can either be strings for plain actions, or objects with a required `type` property and optional `payload` and `meta` properties for payload/meta creator functions.

That means that this:

```javascript
createActions([
  'ACTION_ONE',
  'ACTION_TWO',
])
```

is the exact same as this:

```javascript
createActions([
  {type: 'ACTION_ONE'},
  {type: 'ACTION_TWO'},
])
```

That means that creating actions with a payload is as easy as this:

```javascript
// actions.js
import {createActions} from 'redux-actions-magic'

const { types, actions } = createActions([
  'ACTION_ONE',
  'ACTION_TWO',
  {
    type: 'FANCY_ACTION',
    payload: function() {},
    meta: function() {},
  },
])

export { types, actions as default }
```

Although putting objects in the array definition works, it can get a little messy, so I prefer this syntax instead:

```javascript
// actions.js
import {createActions} from 'redux-actions-magic'

// we can put simple actions in an action definitions array
const actionDefs = [
  'ACTION_ONE',
  'ACTION_TWO',
]

// then push fancier actions one at a time for clarity
actionDefs.push({
  type: 'FANCY_ACTION',
  payload: function() {},
  meta: function() {},
})

const { types, actions } = createActions(actionDefs)

export { types, actions as default }
```


## License

The module is released under MIT license
