# 1.6.0

* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 1.5.1
* Change CI browser example in *README.md* to match `ember-frost-core` usage

# 1.5.0
* **Added** a helper to stub out the ember-data store and make it easy to fake responses to calls to the store. 
* **Updated** the dummy route and unit test for route to utilize the ember-data helper. 

# 1.4.0

* **Added** support to automatically add `ember-intl` dependencies to unit tests that specify `service:intl` in their dependencies
* **Updated** lint rules and fixed new warnings


# 1.3.2

* **Fixed** custom reporter to work for consumers using Node 5.


# 1.3.1
* **Added** tests for use with old versions of ember
* **Fixed** issue when used with `ember@2.3` (no `Ember.assign` available)


# 1.3.0
* **Updated** - `ember-mocha` dependency
* **Added** - Helpers to make using `setupTest()`, `setupComponentTest()` and `setupModelTest()` easier.
* **Deprecated** - the `describeComponent()`, `describeModel()` and `describeModule()` helpers
* **Deprecated** - the `diffObject()` method (we'll hopefully incorporate it into a chai addon soon, see #12)

# 1.2.2

* **Fixes** issue where skipped test conditions were being *skipped` since it was actually *pending*


# 1.2.1

* **Improved** custom mocha reporter to show failures as they occur and only show passed tests when all pass (now sorting fastest to slowest to reduce a user from having to scroll as much in their terminal).

When there are failures without stack traces it'll look like this:
<img width="1205" alt="screen shot 2016-12-01 at 3 00 46 pm" src="https://cloud.githubusercontent.com/assets/422902/20816671/639871d8-b7d8-11e6-86e9-e85830e87a37.png">

When there are failures with stack traces it'll look like this:
<img width="1146" alt="screen shot 2016-12-01 at 3 08 34 pm" src="https://cloud.githubusercontent.com/assets/422902/20816680/6c772c68-b7d8-11e6-814e-92bc9a15b961.png">

When all tests pass it'll look like this:
<img width="1270" alt="screen shot 2016-12-01 at 2 06 57 pm" src="https://cloud.githubusercontent.com/assets/422902/20814645/71377978-b7cf-11e6-9b6d-01d682e448be.png">


# 1.2.0

* **Added** custom mocha reporter which can be used by consumers.


# 1.1.2

- **Fixed** generated test names to use `/` instead of `|` as the test name separator, grep-ing the interactive web app can link to unique tests.


# 1.1.1
* **Fixed** test descriptions to be consistent in the format of `Unit | Component | my-component` instead of `Unit: MyComponentComponent` so that `grep`-ing for your component name will actually find tests for your component now.
 * **Added** unit tests for the helpers themselves to make sure descriptions remain correct.

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
