/**
 * Controller for dummy app
 */
import Ember from 'ember'
const {Controller} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({
  @readOnly
  @computed('model.username')
  name (username) {
    return username.split('.').map((part) => Ember.String.capitalize(part)).join(' ')
  }
})
