/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {describeModule, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import {controller} from 'dummy/tests/helpers/ember-test-utils/describe-module'

describeModule(...controller('demo'), function () {
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
