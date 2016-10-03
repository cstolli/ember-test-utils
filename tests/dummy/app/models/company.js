/**
 * dummy company model
 */
import DS from 'ember-data'
const {Model, attr} = DS
import computed, {readOnly} from 'ember-computed-decorators'

export default Model.extend({
  name: attr('string'),
  street: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),

  @readOnly
  @computed('street', 'city', 'state', 'zip')
  address (street, city, state, zip) {
    return street + '\n' + `${city}, ${state} ${zip}`
  }
})
