/**
 * Unit test for the person model
 */
import {expect} from 'chai'
import {describe} from 'mocha'
import {describeModel, it} from 'ember-mocha'
import {model} from 'dummy/tests/helpers/ember-test-utils/describe-model'

describeModel(...model('person', ['model:company']), function () {
  // Replace this with your real tests.
  describe('fullName()', function () {
    let model
    it('should combine first and last name', function () {
      model = this.subject({
        firstName: 'John',
        lastName: 'Doe'
      })
      expect(model.get('fullName')).to.equal('John Doe')
    })
  })
})
