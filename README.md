# ember-test-utils

Ember testing utilities.

###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

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

## Custom Mocha Reporter

If you'd like to use the custom Mocha reporter provided by this addon then your `testem.js` file should look something like this:

```js
var Reporter = require('ember-test-utils/reporter')

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  launch_in_ci: [
    'Chrome'
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

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/ember-test-utils/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/ember-test-utils

[ember-img]: https://img.shields.io/badge/ember-1.13.0+-orange.svg "Ember 1.13.0+"

[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-test-utils.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-test-utils

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-test-utils.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-test-utils

[npm-img]: https://img.shields.io/npm/v/ember-test-utils.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-test-utils
