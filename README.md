# Tabordion

## Functionality

An accordion for small screens changes into tabs for large screens.
Allows the user to navigate through panels of content.

## Usage

Add `data-tabs` to an element to turn it into a tabs component.
Inside the tabs component:
- add `data-tabs-list` to the `ul` to turn it into tabbable navigation
- add `data-tabs-panel` to the section to turn it into a tab panel

The corresponding link and panel are link by `id` and `href`.

Tabordion makes use of `forEach`, `classList` and `querySelectorAll`. Make use of a feature test to check if these
features are supported, only then enhance the content panels:

```
var forEachSupport = ('forEach' in Array.prototype);
var hasQuerySelectorSupport = ('querySelector' in document && 'querySelectorAll' in document);
var hasClassListSupport = ('classList' in document.documentElement);

if (forEachSupport && hasQuerySelectorSupport && hasClassListSupport && ) {
	// enhance tab panels
}

```