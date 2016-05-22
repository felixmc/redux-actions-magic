import isPlainObject from 'is-plain-object'
import isString from 'is-string'
import {createAction} from 'redux-actions'

// map action names to function names
// i.e. DO_SOME_ACTION => doSomeAction
function typeNameToFuncName (typeName) {
  const parts = typeName.split('_')
  return parts.map((part, i) => {
    if (i !== 0 && part.length)
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    else
      return part.toLowerCase()
  }).join('')
}

function createMagicAction (type, payload, meta) {
  const action = createAction(type, payload, meta)
  action.type = type
  return action
}

export function createActions (actionDefs) {
  const types = {}
  const actions = {}

  actionDefs.forEach(actionDef => {
    let magicAction = null

    if (isString(actionDef)) {
      magicAction = createMagicAction(actionDef)
    } else if (isPlainObject(actionDef)) {
      magicAction = createMagicAction(actionDef.type, actionDef.payload, actionDef.meta)
    }

    if (magicAction) {
      const funcName = typeNameToFuncName(magicAction.type)
      actions[funcName] = magicAction
      types[magicAction.type] = magicAction.type
    }
  })

  return { types, actions }
}

// TODO: some features planned for later, extracted from a personal project..

// returns a function that takes in a store dispatch method
// and binds a map of action functions to it
/*export function bindActions(actionsMap, dispatch) {
  const bindedMap = {}

  Object.keys(actionsMap).forEach(actionName => {
    bindedMap[actionName] = (payload) => {
      dispatch(actionsMap[actionName](payload))
    }
  })

  return bindedMap
}

export function combineTypes(...actionTypes) {
  return Object.assign({}, ...actionTypes)
}

export function combineActions(...actions) {
  return Object.assign({}, ...actions)
}*/
