/**
 * Unit tests for the describe-model module
 */
import {expect} from 'chai'
// NOTE: not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
import Ember from 'ember'

import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {controller, route} from 'dummy/tests/helpers/ember-test-utils/describe-module'
import {getDeprecationMessage} from 'dummy/tests/helpers/ember-test-utils/typedefs'

const deprecationMsg = getDeprecationMessage('describeModule')
describe('describeModule()', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(Ember, 'deprecate')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('route()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = route('thing')
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-module.route',
          until: '2.0.0'
        })
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

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-module.route',
          until: '2.0.0'
        })
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

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-module.controller',
          until: '2.0.0'
        })
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

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-module.controller',
          until: '2.0.0'
        })
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['model:thing'])
      })
    })
  })
})
