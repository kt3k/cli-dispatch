const dispatch = require('./')
const fixtureDispatch = require('./test/fixture/dispatch')
const logger = require('./test/fixture/logger')
const test = require('tape')

test('it dispatches the given action by the given name', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal('foo!', msg)
  }

  fixtureDispatch('foo', {})
})

test('it passes the argv to the action', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal(msg, 'Hello, John!')
  }

  fixtureDispatch('bar', {name: 'John'})
})

test('it emits the no-action event when the action is not found', t => {
  t.plan(1)

  fixtureDispatch('baz', {}).on('no-action', () => {
    t.ok(true)
  })
})

test('it uses the given actions options to look for the action file', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal('foo!', msg)
  }

  dispatch('foo', {}, {actions: 'test/fixture/actions'})
})
