import testResolver from './test-resolver'
import {setResolver} from 'ember-mocha'

export default {
  originalResolver: null,

  /**
   * Updates the registry
   * @param {Object} registry - hash of factories by name
   */
  setRegistry (registry) {
    for (let name in registry) {
      testResolver.registry[name] = registry[name]
    }
  },

  /**
   * Wipes out the registry
   * @param {Object} registry - hash of factories by name
   */
  clearRegistry (registry) {
    testResolver.registry = {}
  },

  /**
   * Sets up the registry and sets the test resolver
   * @param {Resolver} resolver - the original resolver the test was running under
   * @param {Object} registry - hash of factories by name
   */
  setup (resolver, registry) {
    this.originalResolver = resolver

    testResolver.namespace = {
      modulePrefix: resolver.namespace.modulePrefix,
      podModulePrefix: resolver.namespace.podModulePrefix
    }

    this.setRegistry(registry)
    setResolver(testResolver)
  },

  teardown () {
    this.clearRegistry()
    setResolver(this.originalResolver)
  }
}
