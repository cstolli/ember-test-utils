/**
 * Unit test for the person model
 */
import {expect} from 'chai'
import {describe, it} from 'mocha'

import {model} from 'dummy/tests/helpers/ember-test-utils/setup-test'

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
