/**
 * Unit test of the my-greeting component
 */
import {expect} from 'chai'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {setupTest} from 'ember-mocha'
import {describe, it} from 'mocha'

const test = unit('my-greeting')
describe(test.label, function () {
  setupTest()

  describe('greeting()', function () {
    it('should utilize the name properly', function () {
      expect(this.get('greeting')).to.equal('Hello, John')
    })
  })
})
