/**
 * Unit test for dummy app demo route
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {route} from 'dummy/tests/helpers/ember-test-utils/setup-test'

const test = route('demo')
describe(test.label, function () {
  test.setup()

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
