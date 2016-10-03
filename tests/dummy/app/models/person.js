/**
 * Dummy person model
 */
import DS from 'ember-data'
const {Model, attr, belongsTo} = DS
import computed, {readOnly} from 'ember-computed-decorators'

export default Model.extend({
  company: belongsTo('company'),
  firstName: attr('string'),
  lastName: attr('string'),

  @readOnly
  @computed('firstName', 'lastName')
  fullName (firstName, lastName) {
    return `${firstName} ${lastName}`
  }
})
