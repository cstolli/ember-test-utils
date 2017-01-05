/**
 * Dummy person model
 */
import computed, {readOnly} from 'ember-computed-decorators'
const {Model, attr, belongsTo} = DS
import DS from 'ember-data'

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
