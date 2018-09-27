/**
 * dummy company model
 */
import DS from 'ember-data'
import computed, {readOnly} from 'ember-decorators/object'
const {Model, attr} = DS

export default Model.extend({
  name: attr('string'),
  street: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),

  @computed('street', 'city', 'state', 'zip')
  get address () {
    return this.get('street') + '\n' + `${this.get('city')}, ${this.get('state')} ${this.get('zip')}`
  }
})
