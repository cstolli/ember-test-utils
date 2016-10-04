/**
 * Unit tests for the describe-model module
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'
import {unit, integration} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describe('describeComponent()', function () {
  describe('unit()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = unit('my-component')
      })

      it('should give proper component name', function () {
        expect(args[0]).to.equal('my-component')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit | Component | my-component')
      })

      it('should set unit to true in options', function () {
        expect(args[2]).to.eql({unit: true})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = unit('my-component', ['component:foo-bar', 'helper:baz'])
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['component:foo-bar', 'helper:baz'])
      })
    })
  })

  describe('integration()', function () {
    let args
    beforeEach(function () {
      args = integration('my-component')
    })

    it('should give proper component name', function () {
      expect(args[0]).to.equal('my-component')
    })

    it('should give proper test description', function () {
      expect(args[1]).to.equal('Integration | Component | my-component')
    })

    it('should set integration to true in options', function () {
      expect(args[2]).to.eql({integration: true})
    })
  })
})
