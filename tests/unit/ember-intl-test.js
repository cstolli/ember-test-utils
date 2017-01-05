/**
 * Unit tests for the setup-test module
 */

import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {addEmberIntlDeps, emberIntlDeps, needsEmberIntlDeps} from 'dummy/tests/helpers/ember-test-utils/ember-intl'

describe('ember-intl', function () {
  describe('addEmberIntlDeps()', function () {
    let deps
    beforeEach(function () {
      deps = ['service:intl']
      addEmberIntlDeps(deps)
    })

    emberIntlDeps.forEach((dep) => {
      it(`should have "${dep}" added`, function () {
        expect(deps).to.include(dep)
      })
    })
  })

  describe('needsEmberIntlDeps()', function () {
    let options, ret
    beforeEach(function () {
      options = {}
    })

    describe('when not unit', function () {
      beforeEach(function () {
        ret = needsEmberIntlDeps(options)
      })

      it('should return false', function () {
        expect(ret).to.equal(false)
      })
    })

    describe('when unit without dependencies', function () {
      beforeEach(function () {
        options.unit = true
        ret = needsEmberIntlDeps(options)
      })

      it('should return false', function () {
        expect(ret).to.equal(false)
      })
    })

    describe('when unit with dependencies, but not ember-intl', function () {
      beforeEach(function () {
        options.unit = true
        options.needs = ['service:bar']
        ret = needsEmberIntlDeps(options)
      })

      it('should return false', function () {
        expect(ret).to.equal(false)
      })
    })

    describe('when unit with ember-intl dependency', function () {
      beforeEach(function () {
        options.unit = true
        options.needs = ['service:bar', 'service:intl', 'helper:foo']
        ret = needsEmberIntlDeps(options)
      })

      it('should return true', function () {
        expect(ret).to.equal(true)
      })
    })
  })
})
