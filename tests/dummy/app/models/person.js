/**
 * Dummy person model
 */
import computed, {readOnly} from 'ember-computed-decorators'
import DS from 'ember-data'
const {Model, attr, belongsTo} = DS

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
