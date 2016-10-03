/**
 * Unit test for the company model
 */
import {expect} from 'chai'
import {describe} from 'mocha'
import {describeModel, it} from 'ember-mocha'
import {model} from 'dummy/tests/helpers/ember-test-utils/describe-model'

describeModel(...model('company'), function () {
  // Replace this with your real tests.
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
