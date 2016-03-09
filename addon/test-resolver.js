import Resolver from 'ember-resolver'

/**
 * Extends Ember's resolver to lookup factories within our cache of factories first
 * Note: Not extending from Ember.DefaultResolver as the docs suggested because DefaultResolver won't automically
 * register addon helpers
 */
const TestResolver = Resolver.extend({

  registry: null,

  /**
   * Overrides the resolve method to look at the internal registry for factories
   * @param {String} fullName - the full name of the factory, i.e <type:name>
   * @returns {Function} factory registered for fullName
   */
  resolve (fullName) {
    if (fullName in this.registry) {
      return this.registry[fullName]
    }
    return this._super(fullName)
  }
})

const testResolver = TestResolver.create({
  registry: {},
  namespace: {}
})

export default testResolver
