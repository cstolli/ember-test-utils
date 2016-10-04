/**
 * Unit tests for the describe-model module
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'
import {route, controller} from 'dummy/tests/helpers/ember-test-utils/describe-module'

describe('describeModule()', function () {
  describe('route()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = route('thing')
      })

      it('should give proper route name', function () {
        expect(args[0]).to.equal('route:thing')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit / Route / thing')
      })

      it('should give blank options', function () {
        expect(args[2]).to.eql({})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = route('thing', ['model:thing'])
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['model:thing'])
      })
    })
  })

  describe('controller()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = controller('thing')
      })

      it('should give proper route name', function () {
        expect(args[0]).to.equal('controller:thing')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit / Controller / thing')
      })

      it('should give blank options', function () {
        expect(args[2]).to.eql({})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = controller('thing', ['model:thing'])
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['model:thing'])
      })
    })
  })
})
