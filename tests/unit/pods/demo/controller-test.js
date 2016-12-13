/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {controller} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = controller('demo')
describe(test.label, function () {
  test.setup()

  let controller
  beforeEach(function () {
    controller = this.subject({
      model: {
        username: 'tony.stark'
      }
    })
  })

  describe('name()', function () {
    it('should return the name', function () {
      expect(controller.get('name')).to.equal('Tony Stark')
    })
  })
})
