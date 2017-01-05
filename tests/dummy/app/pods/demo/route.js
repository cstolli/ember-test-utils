import Ember from 'ember'
const {RSVP, Route, inject} = Ember

export default Route.extend({
  store: inject.service(),

  model () {
    return RSVP.hash({
      companies: this.get('store').findAll('company'),
      username: 'tony.stark'
    })
  }
})
