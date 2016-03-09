import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'
import {registryHelper} from 'ember-test-utils'
import {describeComponent, it} from 'ember-mocha'
import {expect} from 'chai'
import resolver from '../helpers/resolver'

const ListComponent = Ember.Component.extend({
  classNames: ['.list']
})

const ListItemComponent = Ember.Component.extend({
  classNames: ['.list-item']
})

describeComponent('list', 'registryHelper', {
  unit: true,

  needs: ['component:list-item'],

  beforeSetup () {
    registryHelper.setup(resolver, {
      'component:list': ListComponent,
      'component:list-item': ListItemComponent
    })
  },

  teardown () {
    registryHelper.teardown()
  }
}, function () {
  beforeEach(function () {
    this.subject({
      layout: hbs`{{list-item}}`
    })
    this.render()
  })

  it('successfully registers list', function () {
    expect(this.$()).to.have.length(1)
    expect(this.$().hasClass('.list')).to.equal(true)
  })

  it('successfully registers list-item', function () {
    expect(this.$().children().eq(0)).to.have.length(1)
    expect(this.$().children().eq(0).hasClass('.list-item')).to.equal(true)
  })
})
