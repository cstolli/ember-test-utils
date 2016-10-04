/**
 * Unit tests for the describe-model module
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'
import {model, serializer} from 'dummy/tests/helpers/ember-test-utils/describe-model'

describe('describeModel()', function () {
  describe('model()', function () {
    let args
    describe('when just name is given', function () {
      beforeEach(function () {
        args = model('person')
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

      it('should set needs to dependencies in options', function () {
        expect(args[2].needs).to.eql(['adapter:application', 'serializer:company'])
      })
    })
  })
})
