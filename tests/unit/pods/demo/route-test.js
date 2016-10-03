/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {describeModule, it} from 'ember-mocha'
import {beforeEach, describe} from 'mocha'
import {route} from 'dummy/tests/helpers/ember-test-utils/describe-module'

describeModule(...route('demo'), function () {
  let route
  beforeEach(function () {
    route = this.subject()
  })

  describe('.model()', function () {
    let model
    beforeEach(function () {
      model = route.model()
    })

    it('should return the username', function () {
      expect(model.username).to.equal('tony.stark')
    })
  })
})
