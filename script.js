(function(){
    'use strict';

    var ENHANCED_CLASS = ' is-enhanced';
    var ACTIVE_CLASS = 'is-active';
    var LIST_ATTR = 'data-tabs-list';
    var PANEL_ATTR = 'data-tabs-panel';
    var KEYS = {
        left: 37,
        right: 39
    };

    var Tabs = function(element) {
        var component = this;
        var panels = element.querySelectorAll('[' + PANEL_ATTR + ']');
        var list = element.querySelector('[' + LIST_ATTR + ']');
        var listItems = list.querySelectorAll('li');

        element.classList += ENHANCED_CLASS;
        component.activeTabIndex = 0;
        list.setAttribute('role', 'tablist');
        listItems.forEach(function (item) {
            item.setAttribute('role', 'presentation');
        });

        component.tabs = Array.prototype.map.call(panels, function(panel) {
            var panelId = panel.id;
            var trigger = element.querySelector('[href="#' + panelId + '"]');

            return {
                triggers: [trigger],
                panel: panel
            };
        });

        component.tabs.forEach(function(tab, index) {
            component.createTrigger(tab);

            tab.triggers.forEach(function(trigger) {
                trigger.addEventListener('click', function(event) {
                    event.preventDefault();

                    component.disableTab(component.tabs[component.activeTabIndex]);
                    component.activeTabIndex = index;
                    component.enableTab(tab);
                });

                trigger.setAttribute('role', 'tab');
                trigger.setAttribute('aria-controls', tab.panel.id);
            });

            tab.panel.setAttribute('role', 'tabpanel');
        });

        element.addEventListener('keydown', function(event) {

            if (event.keyCode === KEYS.left) {
                component.previousTab();
            }
            if (event.keyCode === KEYS.right) {
                component.nextTab();
            }
        });

        component.enableTab(component.tabs[component.activeTabIndex]);
    };

    Tabs.prototype.createTrigger = function(tab) {
        var panelId = tab.panel.id;
        var trigger = document.createElement('a');

        trigger.href = '#' + panelId;
        trigger.setAttribute('role', 'tab');
        trigger.innerHTML = tab.triggers[0].innerHTML;
        trigger.className += 'tabs__trigger';
        trigger.setAttribute('aria-controls', panelId);

        tab.panel.insertBefore(trigger, tab.panel.firstChild);
        tab.triggers.push(trigger);
    };

    Tabs.prototype.disableTab = function(tab) {
        tab.panel.classList.remove(ACTIVE_CLASS);
        tab.panel.setAttribute('aria-hidden', 'true');
        tab.triggers.forEach(function(trigger) {
            trigger.blur();
            trigger.tabIndex = -1;
            trigger.classList.remove(ACTIVE_CLASS);
        });
    };

    Tabs.prototype.enableTab = function(tab) {
        tab.panel.classList.add(ACTIVE_CLASS);
        tab.panel.setAttribute('aria-hidden', 'false');
        tab.triggers.forEach(function(trigger) {
            trigger.focus();
            trigger.setAttribute('aria-selected', 'true');
            trigger.tabIndex = 0;
            trigger.classList.add(ACTIVE_CLASS);
        });
    };

    Tabs.prototype.nextTab = function () {
        var component = this;
        var lastTabIndex = component.tabs.length - 1;
        var activeTabIndex = component.activeTabIndex;
        var nextTabIndex = activeTabIndex < lastTabIndex ? activeTabIndex + 1 : 0;

        component.activeTabIndex = nextTabIndex;
        component.disableTab(component.tabs[activeTabIndex]);
        component.enableTab(component.tabs[nextTabIndex]);
    };

    Tabs.prototype.previousTab = function () {
        var component = this;
        var lastTabIndex = component.tabs.length - 1;
        var activeTabIndex = component.activeTabIndex;
        var previousTabIndex = activeTabIndex === 0 ? lastTabIndex : activeTabIndex - 1;

        component.activeTabIndex = previousTabIndex;
        component.disableTab(component.tabs[activeTabIndex]);
        component.enableTab(component.tabs[previousTabIndex]);
    };

    document.querySelectorAll('[data-tabs]').forEach(function(tab) {
        new Tabs(tab);
    });

}());
