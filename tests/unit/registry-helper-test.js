import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'
import {registryHelper} from 'ember-test-utils'
import {describeComponent, it} from 'ember-mocha'
import {expect} from 'chai'
import resolver from '../helpers/resolver'
import sinon from 'sinon'

// This component is only defined here to simulate the component you'll actually be testing
const ListComponent = Ember.Component.extend({
  layout: hbs`<ul>{{#each items as |item|}}{{list-item content=item on-click=(action onClicked)}}{{/each}}</ul>`,
  classNames: ['list'],
  items: null,
  onClicked () {
  }
})

// Stub out {{list-item}} to isolate {{list}} from {{list-item}}'s implementation
// This is a unit test after all, we're not testing {{list-item}}
const ListItemComponent = Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-item'],
  layout: hbs`{{content}}`,
  click () {
    if (this.attrs['on-click']) {
      this.attrs['on-click'](this.get('content'))
    }
  }
})

describeComponent('list', 'registryHelper', {
  unit: true,

  // specify any dependencies for {{list}}
  needs: ['component:list-item'],

  beforeSetup () {
    registryHelper.setup(resolver, {
      // {{list}} is supplied here because it's not currently registered
      'component:list': ListComponent,

      // tell Ember we want {{list-item}} implemented by the ListItemComponent stub
      'component:list-item': ListItemComponent
    })
  },

  teardown () {
    registryHelper.teardown()
  }
}, function () {
  let sandbox, component
  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    // instantiate the {{list}} component and pass props
    component = this.subject({
      items: ['item #1', 'item #2', 'item #3']
    })
  })

  afterEach(function () {
    sandbox.reset()
  })

  it('successfully registers list', function () {
    // Don't call render in beforeEach since you might want to adjust props and render afterwards.
    // Also, rendering in the beforeEach will swallow any rendering errors which can be frustating.
    this.render()

    expect(this.$()).to.have.length(1)
    expect(this.$().hasClass('list')).to.equal(true)
  })

  it('successfully registers list-item', function () {
    this.render()

    expect(this.$('.list-item')).to.have.length(3)
  })

  it('will pass items to list-item', function () {
    this.render()

    ;['item #1', 'item #2', 'item #3'].forEach(function (content, idx) {
      expect(this.$('.list-item').eq(idx).text().trim()).to.equal(content)
    })
  })

  // If {{list-item}} wasn't stubbed, how can we be sure that this spec will always pass. If an update
  // was made to {{list-item}} causing the on-click to not fire, this will fail.  We only want to test
  // that a closure action is being used for the on-click attr of {{list-item}}.  We'll leave it up to
  // integration tests to verify {{list}} works with the real {{list-item}}.
  it('will trigger onClicked when list-item is click', function () {
    let spy = sandbox.spy()
    component.set('onClicked', spy)

    this.render()

    this.$('.list-item').eq(0).click()

    expect(spy.called).to.equal(true)
  })
})
