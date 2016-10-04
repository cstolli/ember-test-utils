# 1.1.0
*  **Added** a `serializer` shortcut to the `describe-model` module which yields a `Unit | Serializer | model-name` description compared to the `Unit | Model | model-name` that the `model` shortcut yields. 



# 1.0.0
## Breaking Changes
 * **Removed** `registryHelper` functionality (it isn't as necessary/useful with the introduction of `ember-hook` to make things less brittle.
 * **Moved** remaining code to `test-support/helpers/ember-test-utils` so consumers can have it injected into `tests/helpers` instead of treating it like a normal addon which will have code injected into the main app code tree.

## Non-breaking changes
 * **Added** helpers for `describeComponent` to make writing unit and integration tests easier
 * **Added** helpers for `describeModel` to make writing unit tests easier
 * **Added** helpers for `describeModule` to make writing uni tests easier. 

# 0.2.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

