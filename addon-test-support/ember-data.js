/**
 * Helpers to make it very easy to stub-out the ember data store in integration tests, regardless of
 * how deep the reference to them happens to be. If it's the component under test, this might be a little
 * overkill, since you could have just initialized with the stub store, but it will work for that use-case too.
 */

import Ember from 'ember'
const {RSVP, Service} = Ember

/**
 * @typedef Resolver
 * A resolver for a particular Promise, used to resolve or reject said Promise
 * @property {Function} resolve - the method to call to resolve the Promise
 * @property {Function} reject - the method to call to reject the Promise
 */

/**
 * The methods in DS.Store we want to stub
 * Taken from http://emberjs.com/api/data/classes/DS.Store.html
 */
const storeMethodsToStub = [
  'adapterFor',
  'buildRecord',
  'createRecord',
  'dataWasUpdated',
  'deleteRecord',
  'didSaveRecord',
  'didUpdateAll',
  'fetchRecord',
  'find',
  'findAll',
  'findBelongsTo',
  'findByIds',
  'findHasMany',
  'findMany',
  'findRecord',
  'flushPendingSave',
  'getReference',
  'hashRecordForId',
  'init',
  'modelFor',
  'normalize',
  'peekAll',
  'peekRecord',
  'push',
  'pushPayload',
  'query',
  'queryRecord',
  'recordForId',
  'recordIsLoaded',
  'recordWasError',
  'recordWasInvalid',
  'reloadRecord',
  'retrieveManagedInstance',
  'scheduleSave',
  'serialize',
  'serializeFor',
  'typeMapFor',
  'unloadAll',
  'unloadRecord',
  'updateId'
]

/**
 * Stub the ember data store
 * @param {Object} context - the test context ('this' from within beforeEach)
 * @param {Object} sandbox - the sinon sandbox to use for generating stubs
 * @returns {Store} the store with stubs for all methods (consumer must still provide return values)
 */
export function stubStore (context, sandbox) {
  const stubs = {}
  storeMethodsToStub.forEach((method) => {
    stubs[method] = sandbox.stub()
  })

  context.register('service:store', Service.extend(stubs))
  return context.container.lookup('service:store')
}

/**
 * Stub out a particular method with specific arguments to return a promise
 * @param {Stub} stub - the stubbed method
 * @param {Object[]} args - the arguments to stub for
 * @returns {Resolver} the resolver for the promise that will be returned
 */
export function returnPromiseWithArgs (stub, args) {
  const resolver = {}
  const promise = new RSVP.Promise((resolve, reject) => {
    resolver.resolve = resolve
    resolver.reject = reject
  })

  resolver.promise = promise

  if (args) {
    stub.withArgs(...args).returns(promise)
  } else {
    stub.withArgs().returns(promise)
  }

  return resolver
}
