/**
 * Unit tests for the setup-test module
 */

import {expect} from 'chai'
import {controller, deps, model, module, route, serializer} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('setupTest()', function () {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
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

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {needs: ['serializer:my-bar'], unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      beforeEach(function () {
        test = serializer('my-bar', ['component:foo-bar', 'helper:baz'])
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Serializer / my-bar /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupModelTest() with proper args', function () {
          expect(deps.setupModelTest).to.have.been.calledWith('my-bar', {
            needs: ['component:foo-bar', 'helper:baz', 'serializer:my-bar'],
            unit: true
          })
        })
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
  })
})
