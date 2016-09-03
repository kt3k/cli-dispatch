# cli-dispatch v0.1.0

> Dispatch actions in files from the given parameters.

# Install

    npm install cli-dispatch

# Usage

First you need to set up the main script and `actions/` directoty in the following structure:

```
bin/
├── main.js
└── actions
    ├── version.js
    ├── foo.js
    └── bar.js
```

In main.js:

```js
const dispatch = require('cli-dispatch')
const minimisted = require('minimisted')

minimisted(function ({_: [action], v, version}) {
  if (v || version) {
    action = 'version'
  }

  dispatch(action, arguments[0]).on('no-action', () => {
    console.log(`No such action: ${action}`)
    process.exit(1)
  })
})
```

actions/version.js
```js
module.exports = () => console.log('my-command v1.0.0')
```

actions/foo.js
```js
module.exports = () => console.log('foo!')
```

actions/bar.js
```js
module.exports = argv => console.log(`Hello, ${argv.name}!`)
```

Then, main.js works as the following:

    $ node main.js -v
    my-command v1.0.0
    $ node main.js foo
    foo!
    $ node main.js bar --name John
    Hello, John!

# API

```js
const dispatch = require('cli-dispatch')
```

## dispatch(action, argv, options)

- @param {string} action The name of the action
- @param {object} argv The arguments which is passed to
- @param {object} options The options
- @param {string} [options.actions] The directory where this function look for the actions. Default is `[the caller's directory]/actions`. For example, if your main.js is in `/foo/bar` and you call dispatch in main.js, then it look for the actions under `/foo/bar/actions`
- @return {CliDispatch} custom object

This dispatches the action by the given action name and returns the custom CliDispatch class instance. If the action file is not found, then the instance emits the `no-action` event.

`argv` is passed to the action function. 

# License

MIT