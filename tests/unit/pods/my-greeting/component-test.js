/**
 * Unit test of the my-greeting component
 */
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import {unit} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describeComponent(...unit('my-greeting'), function () {
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
