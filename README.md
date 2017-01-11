[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-test-utils.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-test-utils

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-test-utils.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-test-utils

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

**ember-test-utils** provides a set of utilities to help you in testing Ember modules. This library requires you
use `ember-cli-mocha` and `ember-mocha` as your testing framework. It provides shortcuts for working with:
`setupComponentTest` and `setupComponent`


### `setupComponentTest`
Two shortcuts (`integration`, and `unit`) are provided to help transform

```js
import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

describe('Integration: MyGreetingComponent', function () {
  setupComponentTest('my-greeting', {integration: true})
  it('renders', function () {
    this.set('name', 'John')
    this.render(hbs`{{my-greeting name=name}}`)
    expect(this.$()).to.have.length(1)
  })
})
```

into

```js
import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('my-greeting')
describe(test.label, function () {
  test.setup()

  it('renders', function () {
    this.set('name', 'John')
    this.render(hbs`{{my-greeting name=name}}`)
    expect(this.$()).to.have.length(1)
  })
})
```

and

```js
import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('Unit: MyGreetingComponent', function () {
  setupComponentTest('my-greeting', {
    needs: ['component:foo', 'helper:bar'],
    unit: true
  })

  it('renders', function () {
    // creates the component instance
    let component = this.subject()

    // renders the component on the page
    this.render()
    expect(component).not.to.equal(undefined)
    expect(this.$()).to.have.length(1)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'
import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('my-greeting', ['component:foo', 'helper:bar'])
  test.setup()

  it('renders', function () {
    // creates the component instance
    let component = this.subject()

    // renders the component on the page
    this.render()
    expect(component).not.to.equal(undefined)
    expect(this.$()).to.have.length(1)
  })
})
```

## `setupTest`
Five shortcuts are provided (`model`, `serializer`, `route`, `controller`, and `module`).

### `model`
The `model` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('Unit: PersonModel', function () {
  setupModelTest('person', {
    unit: true,
    needs: ['model:company']
  })

  it('exists', function () {
    let model = this.subject()
    expect(model).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {model} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = model('person', ['model:company'])
describe(test.label, function () {
  test.setup()

  it('exists', function () {
    let model = this.subject()
    expect(model).not.to.equal(undefined)
  })
})
```

### `serializer`
The only difference between `model` and `serializer` is what the description of the test will end up being:

```
Unit / Model / model-name
```

vs.

```
Unit / Serializer / model-name
```

### `route`
The `route` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest('route:demo', {
    needs: ['controller:demo'],
    unit: true
  })
  // Replace this with your real tests.
  it('exists', function () {
    let route = this.subject()
    expect(route).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {route} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = route('demo', ['controller:demo'])
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let route = this.subject()
    expect(route).not.to.equal(undefined)
  })
})
```

### `controller`
The `controller` helper allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest('controller:demo', {
    needs: ['controller:foo'],
    unit: true
  })
  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {controller} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = controller('demo', ['controller:foo'])
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

### `module`
The `module` helper is a catch-all to let you unit test any module, it allows you to turn this:

```js
import {expect} from 'chai'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

describe('DemoController', function () {
  setupTest('controller:demo', {
    needs: ['controller:foo'],
    unit: true
  })
  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

into

```js
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {module} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = module('controller:demo', ['controller:foo'])
describe(test.label, function () {
  test.setup()

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```
## Global Libraries

Use this helper in your unit tests to determine if a component called globally-scoped `Ember.$`, `$` or `jQuery`. This ensures that there is no DOM-reference leakage outside of a component.

```js
import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import globalLibraries from 'dummy/tests/helpers/ember-test-utils/global-libraries'
import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('my-component')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      hook: 'myHook'
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('Instances of components do not interfere with other instances', function () {
    beforeEach(function () {
      globalLibraries.setupSpies(sandbox)
      this.render()
      globalLibraries.triggerEvents(component)
    })

    it('has no references to Ember.$, $ or jQuery', function () {
      expect(globalLibraries.called()).to.equal(false)
    })
  })
})
```
The `setupSpies()` function takes a `sandbox` as an argument to setup the `sandbox.spy()` methods on the global `Ember.$`, `$` and `jQuery`.

The `resetSpies()` function will reset the `sandbox.spy()` methods on the global `Ember.$`, `$` and `jQuery`.

The `triggerEvents()` function takes a `component` as an argument and triggers the following events on it: `didDestroyElement`, `didInsertElement`, `didRender`, `didUpdate`, `willClearRender`, `willDestroyElement`, `willInsertElement`, `willRender` and `willUpdate`. Triggering of the various events will ensure code that has handlers attached to those events will be exercised, making the helper more effective at detecting global references.

The call to `called()` returns a boolean that is the result of the sinon spies detecting `Ember.$`, `$`, or `jQuery`. Validate `false` to verify that the code within the component does not have global references to `Ember.$`, `$` or `jQuery`.

```js
<boolean: true if the spy detects a reference to the global scope, false if not>
```

## Custom Mocha Reporter

If you'd like to use the custom Mocha reporter provided by this addon then your `testem.js` file should look something like this:

```js
var Reporter = require('ember-test-utils/reporter')

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  launch_in_ci: [
    'Firefox'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  reporter: new Reporter(),
  test_page: 'tests/index.html?hidepassed'
}
```

> NOTE: This reporter will group test results into two sections: failed and passed. Each section is sorted from slowest test to fastest test so you can see which tests are causing your CI to come to a crawl.

## Contributing

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
