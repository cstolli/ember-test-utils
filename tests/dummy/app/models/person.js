/**
 * Dummy person model
 */
import DS from 'ember-data'
import {computed} from 'ember-decorators/object'
const {Model, attr, belongsTo} = DS

export default Model.extend({
  company: belongsTo('company'),
  firstName: attr('string'),
  lastName: attr('string'),

  @computed('firstName', 'lastName')
  get fullName () {
    return `${this.get('firstName')} ${this.get('lastName')}`
  }
})
