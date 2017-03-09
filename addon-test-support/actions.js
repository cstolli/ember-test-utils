/**
 * Helper for making it easier to test actions
 */

/**
 * Using foo.send('actionName') won't return the return value of the action like using an action closure will
 * This callAction function will return the result of the action
 *
 * @param {Object} object - the thing which holds the action (controller, component, route, whatever)
 * @param {String} actionName - the name of the action to call
 * @param {*} args - any arguments for the action
 * @returns {*} the return value of the action
 */
export function callAction (object, actionName, ...args) {
  const action = object.actions[actionName]
  return action.apply(object, args)
}
