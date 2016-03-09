import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'test-utils',
  'Integration: EmberTestUtilsComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#test-utils}}
      //     template content
      //   {{/test-utils}}
      // `)

      this.render(hbs`{{test-utils}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
