/**
 * Unit tests for the object-diff module
 */
import {expect} from 'chai'
import _ from 'lodash'
import {describe, it} from 'mocha'
import objectDiff, {ARRAY_PLACEHOLDER} from 'dummy/tests/helpers/ember-test-utils/object-diff'

const tests = []

function addTest (description, ...input) {
  const expectedResult = input.pop()
  tests.push({
    description,
    input,
    expectedResult
  })
}
addTest('gives a list of keys that don\'t exist in the first object',
  {
    foo: 1
  }, {
    foo: 1,
    bar: 'test'
  },
  {
    differentKeys: [],
    rightOnlyKeys: ['bar'],
    leftOnlyKeys: [],
    rightDiff: {bar: 'test'},
    leftDiff: {}
  }
)
addTest('gives a list of keys that don\'t exist in the second object',
  {
    foo: 1,
    bar: 'test'
  }, {
    foo: 1
  },
  {
    differentKeys: [],
    rightOnlyKeys: [],
    leftOnlyKeys: ['bar'],
    rightDiff: {},
    leftDiff: {bar: 'test'}
  }
)
addTest('performs deep value comparison',
  {
    foo: {
      bar: {
        baz: true
      }
    }
  },
  {
    foo: {
      bar: {
        baz: false
      }
    }
  },
  {
    differentKeys: ['foo.bar.baz'],
    leftOnlyKeys: [],
    leftDiff: {foo: {bar: {baz: true}}},
    rightOnlyKeys: [],
    rightDiff: {foo: {bar: {baz: false}}}
  }
)

addTest('compares deeply with unmatched keys',
  {
    foo: {
      bar: true,
      spaz: 'some var'
    },
    sameKey: 'same key'
  },
  {
    foo: {
      bar: false,
      baz: 'some other var'
    },
    sameKey: 'same key'
  },
  {
    differentKeys: ['foo.bar'],
    leftOnlyKeys: ['foo.spaz'],
    leftDiff: {foo: {bar: true, spaz: 'some var'}},
    rightOnlyKeys: ['foo.baz'],
    rightDiff: {foo: {bar: false, baz: 'some other var'}}
  }
)

addTest('compares objects with different depths',
  {
    foo: {
      bar: {
        baz: 'quux'
      }
    }
  },
  {
    foo: 'bar'
  },
  {
    differentKeys: ['foo'],
    leftOnlyKeys: [],
    leftDiff: {
      foo: {
        bar: {
          baz: 'quux'
        }
      }
    },
    rightOnlyKeys: [],
    rightDiff: {
      foo: 'bar'
    }
  }
)

addTest('compares arrays',
  {
    fooArray: [
      true,
      1,
      5,
      5,
      {foo: 'some value', baz: 'in both'},
      {bar: 'some other value'}
    ]
  },
  {
    fooArray: [
      true,
      2,
      5,
      5,
      {bar: 'some other value', baz: 'in both'},
      'not an object'
    ]
  },
  {
    differentKeys: ['fooArray.1', 'fooArray.5'],
    leftOnlyKeys: ['fooArray.4.foo'],
    leftDiff: {
      fooArray: [
        ARRAY_PLACEHOLDER,
        1,
        ARRAY_PLACEHOLDER,
        ARRAY_PLACEHOLDER,
        {foo: 'some value'},
        {bar: 'some other value'}
      ]
    },
    rightOnlyKeys: ['fooArray.4.bar'],
    rightDiff: {
      fooArray: [
        ARRAY_PLACEHOLDER,
        2,
        ARRAY_PLACEHOLDER,
        ARRAY_PLACEHOLDER,
        {bar: 'some other value'},
        'not an object'
      ]
    }
  }
)

addTest('compares arrays of different lengths',
  {
    fooArray: [3, 4, 5, 6],
    barArray: []
  },
  {
    fooArray: [4, 4],
    barArray: [1, 2, 3]
  },
  {
    differentKeys: ['fooArray.0'],
    rightOnlyKeys: ['barArray.0', 'barArray.1', 'barArray.2'],
    leftOnlyKeys: ['fooArray.2', 'fooArray.3'],
    rightDiff: {fooArray: [4, ARRAY_PLACEHOLDER], barArray: [1, 2, 3]},
    leftDiff: {fooArray: [3, ARRAY_PLACEHOLDER, 5, 6]}
  }
)

function runTest (unitUnderTest, {expectedResult, description, input}, testNumber) {
  it(description, function () {
    const actualResult = unitUnderTest.apply(this, input)
    if (!_.isEqual(actualResult, expectedResult)) {
      console.log(`TEST ${testNumber + 1} RESULT`, JSON.stringify([actualResult, expectedResult], null, 2))
    }
    expect(actualResult).to.eql(expectedResult)
  })
}

describe('object diff', function () {
  _.each(tests, _.partial(runTest, objectDiff))
})
