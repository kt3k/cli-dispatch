'use strict'

const path = require('path')
const callsite = require('callsite')
const EventEmitter = require('events').EventEmitter

module.exports = main

/**
 * @return {string} The caller's directory
 */
const callersDir = () => path.dirname(callsite()[2].getFileName())

/**
 * Dispatches the action by the given paramters.
 * @param {string} action The action name
 * @param {object} argv The parameters for the actions
 * @param {string} [options.actions] The action's directory (relative path)
 * @return {CliDispatch}
 */
function main (action, argv, options) {
  options = options || {}
  const actionDir = path.join(callersDir(), options.actions || 'actions')
  const cli = new CliDispatch(action, actionDir)

  setImmediate(() => cli.dispatch(argv))

  return cli
}

/**
 * CliDispatch internal class.
 * @param {string} action The action name
 * @param {string} dir The directory name (absolute path)
 */
function CliDispatch (action, dir) {
  this.action = action
  this.dir = dir
}

const prototype = CliDispatch.prototype = new EventEmitter()

/**
 * Dispatches the action with the given arguments.
 * @param {object} argv The arguments for the action
 */
prototype.dispatch = function (argv) {
  let action = null

  try {
    action = require(path.join(this.dir, this.action))
  } catch (e) {
    this.emit('no-action')
    return
  }

  action(argv)
}
