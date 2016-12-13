/**
 * Unit test of the my-greeting component
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'
import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('my-greeting')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      name: 'John'
    })
  })

  describe('greeting()', function () {
    it('should utilize the name properly', function () {
      expect(component.get('greeting')).to.equal('Hello, John')
    })
  })
})
