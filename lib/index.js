'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActions = createActions;
exports.combineActions = combineActions;

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isString = require('is-string');

var _isString2 = _interopRequireDefault(_isString);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// map action names to function names
// i.e. DO_SOME_ACTION => doSomeAction
function typeNameToFuncName(typeName) {
  var parts = typeName.split('_');
  return parts.map(function (part, i) {
    if (i !== 0 && part.length) return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();else return part.toLowerCase();
  }).join('');
}

function createMagicAction(type, payload, meta) {
  var action = (0, _reduxActions.createAction)(type, payload, meta);
  action.type = type;
  return action;
}

function createActions(actionDefs) {
  var types = {};
  var actions = {};

  actionDefs.forEach(function (actionDef) {
    var magicAction = null;

    if ((0, _isString2.default)(actionDef)) {
      magicAction = createMagicAction(actionDef);
    } else if ((0, _isPlainObject2.default)(actionDef)) {
      magicAction = createMagicAction(actionDef.type, actionDef.payload, actionDef.meta);
    }

    if (magicAction) {
      var funcName = typeNameToFuncName(magicAction.type);
      actions[funcName] = magicAction;
      types[magicAction.type] = magicAction.type;
    }
  });

  return { types: types, actions: actions };
}

function combineActions(actions) {
  return actions.reduce(function (combined, next) {
    return {
      types: Object.assign(combined.types, next.types),
      actions: Object.assign(combined.actions, next.actions)
    };
  }, { types: {}, actions: {} });
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