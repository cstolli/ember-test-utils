/**
 * Unit tests for the setup-test module
 */

import {expect} from 'chai'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {controller, deps, model, module, route, serializer} from 'dummy/tests/helpers/ember-test-utils/setup-test'

describe('setupTest()', function () {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(deps, 'addEmberIntlDeps')
    sandbox.stub(deps, 'needsEmberIntlDeps')
    sandbox.stub(deps, 'setupModelTest')
    sandbox.stub(deps, 'setupTest')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('module()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = module('foo:my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Foo / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('foo:my-bar', {unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let options
      beforeEach(function () {
        options = {needs: ['component:foo-bar', 'helper:baz']}
        test = module('foo:my-bar', options)
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Foo / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith(options)
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('foo:my-bar', {
            needs: ['component:foo-bar', 'helper:baz'],
            unit: true
          })
        })
      })
    })

    describe('when it does not need ember-intl deps', function () {
      beforeEach(function () {
        deps.needsEmberIntlDeps.returns(false)
        test = module('foo:my-bar')
      })

      it('should not add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.callCount(0)
      })
    })

    describe('when it does need ember-intl deps', function () {
      let needs
      beforeEach(function () {
        needs = ['foo:bar']
        deps.needsEmberIntlDeps.returns(true)
        test = module('foo:my-bar', {needs})
      })

      it('should add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.been.calledWith(needs)
      })
    })
  })

  describe('model()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = model('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Model / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let needs
      beforeEach(function () {
        needs = ['component:foo-bar', 'helper:baz']
        test = model('my-bar', needs)
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Model / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true, needs})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {
            needs: ['component:foo-bar', 'helper:baz'],
            unit: true
          })
        })
      })
    })

    describe('when it does not need ember-intl deps', function () {
      beforeEach(function () {
        deps.needsEmberIntlDeps.returns(false)
        test = model('my-bar')
      })

      it('should not add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.callCount(0)
      })
    })

    describe('when it does need ember-intl deps', function () {
      let needs
      beforeEach(function () {
        needs = ['foo:bar']
        deps.needsEmberIntlDeps.returns(true)
        test = model('my-bar', needs)
      })

      it('should add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.been.calledWith(needs)
      })
    })
  })

  describe('serializer()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = serializer('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Serializer / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true, needs: ['model:my-bar']})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {needs: ['model:my-bar'], unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let needs
      beforeEach(function () {
        needs = ['component:foo-bar', 'helper:baz']
        test = serializer('my-bar', ['component:foo-bar', 'helper:baz'])
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Serializer / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true, needs: needs.concat(['model:my-bar'])})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {
            needs: ['component:foo-bar', 'helper:baz', 'model:my-bar'],
            unit: true
          })
        })
      })
    })

    describe('when it does not need ember-intl deps', function () {
      beforeEach(function () {
        deps.needsEmberIntlDeps.returns(false)
        test = serializer('my-bar')
      })

      it('should not add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.callCount(0)
      })
    })

    describe('when it does need ember-intl deps', function () {
      let needs
      beforeEach(function () {
        needs = ['foo:bar']
        deps.needsEmberIntlDeps.returns(true)
        test = serializer('my-bar', needs)
      })

      it('should add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.been.calledWith(needs)
      })
    })
  })

  describe('route()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = route('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Route / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('route:my-bar', {unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let needs
      beforeEach(function () {
        needs = ['component:foo-bar', 'helper:baz']
        test = route('my-bar', needs)
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Route / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true, needs})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('route:my-bar', {
            needs: ['component:foo-bar', 'helper:baz'],
            unit: true
          })
        })
      })
    })

    describe('when it does not need ember-intl deps', function () {
      beforeEach(function () {
        deps.needsEmberIntlDeps.returns(false)
        test = route('my-bar')
      })

      it('should not add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.callCount(0)
      })
    })

    describe('when it does need ember-intl deps', function () {
      let needs
      beforeEach(function () {
        needs = ['foo:bar']
        deps.needsEmberIntlDeps.returns(true)
        test = route('my-bar', needs)
      })

      it('should add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.been.calledWith(needs)
      })
    })
  })

  describe('controller()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = controller('my-bar')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Controller / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('controller:my-bar', {unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let needs
      beforeEach(function () {
        needs = ['component:foo-bar', 'helper:baz']
        test = controller('my-bar', needs)
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Controller / my-bar /')
      })

      it('should check if ember-intl deps are needed', function () {
        expect(deps.needsEmberIntlDeps).to.have.been.calledWith({unit: true, needs})
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupTest() with proper args', function () {
          expect(deps.setupTest).to.have.been.calledWith('controller:my-bar', {
            needs: ['component:foo-bar', 'helper:baz'],
            unit: true
          })
        })
      })
    })

    describe('when it does not need ember-intl deps', function () {
      beforeEach(function () {
        deps.needsEmberIntlDeps.returns(false)
        test = controller('my-bar')
      })

      it('should not add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.callCount(0)
      })
    })

    describe('when it does need ember-intl deps', function () {
      let needs
      beforeEach(function () {
        needs = ['foo:bar']
        deps.needsEmberIntlDeps.returns(true)
        test = controller('my-bar', needs)
      })

      it('should add ember-intl deps', function () {
        expect(deps.addEmberIntlDeps).to.have.been.calledWith(needs)
      })
    })
  })
})
