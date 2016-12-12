/**
 * Unit tests for the describe-model module
 */
import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {model, serializer} from 'dummy/tests/helpers/ember-test-utils/describe-model'
import {getDeprecationMessage} from 'dummy/tests/helpers/ember-test-utils/typedefs'

const deprecationMsg = getDeprecationMessage('describeModel')
describe('describeModel()', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(Ember, 'deprecate')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('model()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = model('person')
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-model.model',
          until: '2.0.0'
        })
      })

      it('should give proper model name', function () {
        expect(args[0]).to.equal('person')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit / Model / person')
      })

      it('should give blank options', function () {
        expect(args[2]).to.eql({})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = model('person', ['model:company'])
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-model.model',
          until: '2.0.0'
        })
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['model:company'])
      })
    })
  })

  describe('serializer()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = serializer('company')
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-model.serializer',
          until: '2.0.0'
        })
      })

      it('should give proper model name', function () {
        expect(args[0]).to.equal('company')
      })

      it('should give proper test description', function () {
        expect(args[1]).to.equal('Unit / Serializer / company')
      })

      it('should give blank options', function () {
        expect(args[2]).to.eql({})
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        args = serializer('company', ['adapter:application', 'serializer:company'])
      })

      it('should issue deprecation warning', function () {
        expect(Ember.deprecate).to.have.been.calledWith(deprecationMsg, false, {
          id: 'ember-test-utils.describe-model.serializer',
          until: '2.0.0'
        })
      })

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['adapter:application', 'serializer:company'])
      })
    })
  })
})
