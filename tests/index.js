const expect = require('expect')

const magic = require('../lib')

describe('redux actions magic', () => {

  it('should create action types from action defs', () => {
    const actionDefs = ['ACTION_ONE', { type: 'ACTION_TWO' }]
    const { types } = magic.createActions(actionDefs)
    expect(types.ACTION_ONE).toBe('ACTION_ONE')
    expect(types.ACTION_TWO).toBe('ACTION_TWO')
  })

  it('should name action creators as a camelCase of action types', () => {
    const actionDefs = ['ACTION_ONE', { type: 'ACTION_TWO' }]
    const { actions } = magic.createActions(actionDefs)
    expect(typeof actions.actionOne).toBe('function')
    expect(typeof actions.actionTwo).toBe('function')
  })

  it('should add a type property to action creators', () => {
    const actionDefs = ['ACTION_ONE', { type: 'ACTION_TWO' }]
    const { actions } = magic.createActions(actionDefs)
    expect(actions.actionOne.type).toBe('ACTION_ONE')
    expect(actions.actionTwo.type).toBe('ACTION_TWO')
  })

  it('should create simple action creators', () => {
    const actionDefs = ['ACTION_ONE', { type: 'ACTION_TWO' }]
    const { actions } = magic.createActions(actionDefs)
    const actionOne = actions.actionOne()
    const actionTwo = actions.actionTwo()
    expect(actionOne.type).toBe('ACTION_ONE')
    expect(actionTwo.type).toBe('ACTION_TWO')
  })

  it('should create action creators with payload creators', () => {
    const actionDefs = [{
      type: 'ACTION_ONE',
      payload: () => 'data',
    }]
    const { actions } = magic.createActions(actionDefs)
    const actionOne = actions.actionOne()
    expect(actionOne.type).toBe('ACTION_ONE')
    expect(actionOne.payload).toBe('data')
  })

  it('should create action creators with meta creators', () => {
    const actionDefs = [{
      type: 'ACTION_ONE',
      meta: () => 'data',
    }]
    const { actions } = magic.createActions(actionDefs)
    const actionOne = actions.actionOne()
    expect(actionOne.type).toBe('ACTION_ONE')
    expect(actionOne.meta).toBe('data')
  })

  it('should combine objects of action creators and types', () => {
    const actionDefsOne = ['ACTION_ONE']
    const actionDefsTwo = ['ACTION_TWO']
    const magicActionsOne = magic.createActions(actionDefsOne)
    const magicActionsTwo = magic.createActions(actionDefsTwo)
    const { types, actions } = magic.combineActions([magicActionsOne, magicActionsTwo])
    expect(types.ACTION_ONE).toBe('ACTION_ONE')
    expect(types.ACTION_TWO).toBe('ACTION_TWO')
    expect(typeof actions.actionOne).toBe('function')
    expect(typeof actions.actionTwo).toBe('function')
  })

})
