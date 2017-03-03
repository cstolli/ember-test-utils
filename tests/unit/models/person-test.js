/**
 * Unit test for the person model
 */
import {expect} from 'chai'
import {model} from 'ember-test-utils/test-support/setup-test'
import {describe, it} from 'mocha'

const test = model('person', ['model:company'])
describe(test.label, function () {
  test.setup()

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
