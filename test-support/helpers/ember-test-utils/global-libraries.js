import Ember from 'ember'
const {run} = Ember

export let jqueryAliasSpy
export let jquerySpy
export let emberJquerySpy

export function setupSpies (sandbox) {
  jqueryAliasSpy = sandbox.spy(window, '$')
  jquerySpy = sandbox.spy(window, 'jQuery')
  emberJquerySpy = sandbox.spy(Ember, '$')
}

export function triggerEvents (component) {
  run(() => {
    [
      'didDestroyElement',
      'didInsertElement',
      'didRender',
      'didUpdate',
      'willClearRender',
      'willDestroyElement',
      'willInsertElement',
      'willRender',
      'willUpdate'
    ].map((event) => {
      component.trigger(event)
    })
  })
}

export function called () {
  return jqueryAliasSpy.called || jquerySpy.called || emberJquerySpy.called
}

export function resetSpies () {
  jqueryAliasSpy.reset()
  jquerySpy.reset()
  emberJquerySpy.reset()
}
