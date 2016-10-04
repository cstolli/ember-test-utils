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
`describeComponent`, `describeModel`, and `describeModule`


### `describeComponent`
Two shortcuts (`integration`, and `unit`) are provided to help transform

```js
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'my-greeting',
  'Integration: MyGreetingComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.set('name', 'John')
      this.render(hbs`{{my-greeting name=name}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
```

into

```js
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {integration} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describeComponent(...integration('my-greeting'), function () {
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
import {describeComponent, it} from 'ember-mocha'

describeComponent(
  'my-greeting',
  'MyGreetingComponent',
  {
    needs: ['component:foo', 'helper:bar'],
    unit: true
  },
  function () {
    it('renders', function () {
      // creates the component instance
      let component = this.subject()

      // renders the component on the page
      this.render()
      expect(component).not.to.equal(undefined)
      expect(this.$()).to.have.length(1)
    })
  }
)
```

into

```js
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {unit} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describeComponent(...unit('my-greeting', ['component:foo', 'helper:bar']), function () {
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

## `describeModel`
Two shortcuts are provided (`model` and `serializer`) to allow you to turn this:

```js
import {expect} from 'chai'
import {describeModel, it} from 'ember-mocha'

describeModel(
  'person',
  'Unit | Model | person',
  {
    // Specify the other units that are required for this test.
    needs: ['model:company']
  },
  function () {
    it('exists', function () {
      let model = this.subject()
      expect(model).not.to.equal(undefined)
    })
  }
)
```

into

```js
import {expect} from 'chai'
import {describeModel, it} from 'ember-mocha'
import {model} from 'dummy/tests/helpers/ember-test-utils/describe-model'

describeModel(...model('person', ['model:company']), function () {
  it('exists', function () {
    let model = this.subject()
    expect(model).not.to.equal(undefined)
  })
})
```

The only difference between `model` and `serializer` is what the description of the test will end up being:

```
Unit | Model | model-name
```

vs.

```
Unit | Serializer | model-name
```

## `describeModule`
Provides three shortcuts (`route`, `controller`, and `module`) The `route` and `controller` shortcuts are just
extra shortcuts for `module` which pre-populate the `type` param to be `'route'` or `'controller'`.

They let you transform

```js
import {expect} from 'chai'
import {describeModule, it} from 'ember-mocha'

describeModule(
  'controller:demo',
  'DemoController',
  {
    needs: ['controller:foo']
  },
  function () {
    // Replace this with your real tests.
    it('exists', function () {
      let controller = this.subject()
      expect(controller).not.to.equal(undefined)
    })
  }
)
```

into

```js
import {expect} from 'chai'
import {describeModule, it} from 'ember-mocha'
import {controller} from 'dummy/tests/helpers/ember-test-utils/describe-module'

describeModule(...controller('demo', ['controller:foo'], function () {
  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject()
    expect(controller).not.to.equal(undefined)
  })
})
```

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
