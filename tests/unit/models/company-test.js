/**
 * Unit test for the company model
 */
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {model} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = model('company')
describe(test.label, function () {
  test.setup()

  describe('address()', function () {
    let model
    it('should combine all the address pieces', function () {
      model = this.subject({
        street: '123 Main Street',
        city: 'Smallville',
        state: 'KA',
        zip: '12345'
      })
      expect(model.get('address')).to.equal('123 Main Street\nSmallville, KA 12345')
    })
  })
})
