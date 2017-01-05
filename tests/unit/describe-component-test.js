/**
 * Unit tests for the describe-component module
 */

import {expect} from 'chai'
// NOTE: not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
import Ember from 'ember'

import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration, unit} from 'dummy/tests/helpers/ember-test-utils/describe-component'
import {getDeprecationMessage} from 'dummy/tests/helpers/ember-test-utils/typedefs'

const deprecationMsg = getDeprecationMessage('describeComponent')
describe('describeComponent()', function () {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(Ember, 'deprecate')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('unit()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = unit('my-component')
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-component.unit',
          until: '2.0.0'
        })
      })

      it('should give proper component name', function () {
        expect(args[0]).to.equal('my-component')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit / Component / my-component')
      })

      it('should set unit to true in options', function () {
        expect(args[2]).to.eql({unit: true})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = unit('my-component', ['component:foo-bar', 'helper:baz'])
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-component.unit',
          until: '2.0.0'
        })
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

    it('should issue deprecation warning', function () {
      expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
        id: 'ember-test-utils.describe-component.integration',
        until: '2.0.0'
      })
    })

    it('should give proper component name', function () {
      expect(args[0]).to.equal('my-component')
    })

    it('should give proper test description', function () {
      expect(args[1]).to.equal('Integration / Component / my-component')
    })

    it('should set integration to true in options', function () {
      expect(args[2]).to.eql({integration: true})
    })
  })
})
