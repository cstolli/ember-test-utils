[ci-img]: https://img.shields.io/travis/ciena-frost/ember-test-utils.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-test-utils

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-test-utils.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-test-utils

[npm-img]: https://img.shields.io/npm/v/ember-test-utils.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-test-utils

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-test-utils

 * [Installation](#Installation)
 * [Getting Started](#Getting Started)
 * [Contributing](#Contributing)

## Installation
```
ember install ember-test-utils
```

## Getting Started

**ember-test-utils** provides a set of utilities to help you in testing Ember components.  Wether you're adding integration or unit tests, you can use `registryHelper` to stub out factories.  This library requires you use `ember-cli-mocha` and `ember-mocha` as your testing framework.

### Using `registryHelper`

`registryHelper` must be properly initialized with `beforeSetup` and destroyed with `teardown`

```js
import {registryHelper} from 'ember-test-utils'
import resolver from 'path/to/resolver'

describeComponent('component-name', 'description', {
  unit: true,

  beforeSetup () {
    registryHelper.setup(resolver, {
      'component:component-name': ComponentClass
    })
  },

  teardown () {
    registryHelper.teardown()
  }
})
```

`registryHelper.setup` requires some explanation.  It takes a *resolver* as the first argument, since it must restore it when tests are finished.  For a vanilla Ember project, this resolver is usually located at `tests/helpers/resolver`.

The *registry hash* which specifies the factories you want to stub, is an object keyed on the factory name.  The convention for the name is *<type:name>*.

```js
registryHelper.setup(resolver, {
  'component:component-name': ComponentClass,
  'template:components/component-name': hbs`Mr. Fancy Pants`,
  'helpers:helper-name': HelperFunction,
  'controller:controller-name': ControllerClass
})
```

### Integration vs. Unit tests

`registryHelper` can be used in either integration or unit tests.  Just specify, `unit: true` or `integration: true` in the test module.

If inside an integration tests, all dependencies are loaded/injected.  This environment will allow you to test your components with their dependencies intact.  You can use `registryHelper` to then stub individual dependencies out.

If inside a unit test, the environment is completely isolated.  No dependencies are loaded so you'll need to specify those dependencies with the `needs` array.


```js
describeComponent('component-name', 'description', {
  unit: true,

  needs: [
    'component:nested-component-name'
  ],

  beforeSetup () {
    registryHelper.setup(resolver, {
      'component:nested-component-name': NestedComponentClass
    })
  },

  teardown () {
    registryHelper.teardown()
  }
})
```

##Contributing

This following outlines the details of collaborating on this Ember addon:

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
