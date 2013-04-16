goog.require('goog.array');
goog.require('goog.dom.forms');
goog.provide('src.base.control.redirectList');
goog.require('src.base.helper.domCreation');

/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonId = 'ButtonId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonList = 'ButtonList';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonText = 'ButtonText';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ContainerClass = 'ContainerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ContainerId = 'ContainerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.For = 'For';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.Goto = 'Goto';



/**
 @param {Object} options The collection of options to build the customize the control.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @param {?function(Object, string, string, function, function) : function} createTheClickEvent The method
 compose the click handler for a created button.
 @param {function(Object) : string} getValue The method used to get the value from the "sister" control.
 @param {function(string)} redirect The method used to change the current url.
 @param {?function(Object, Object)} setClick The method used to set the click event.
 @return {Object} The control.
 @export
 */
src.base.control.redirectList.initialize = function(options, createADiv, createAButton, createTheClickEvent, getValue, redirect, setClick) {
    var Current = src.base.control.redirectList;

    createADiv = createADiv ? createADiv : src.base.helper.domCreation.createADiv;
    createAButton = createAButton ? createAButton : src.base.helper.domCreation.button;

    createTheClickEvent = createTheClickEvent ? createTheClickEvent : null;

    getValue = getValue ? getValue : goog.dom.forms.getValue;
    redirect = redirect ? redirect : window.location;
    setClick = setClick ? setClick : src.base.helper.events.setClick;


    var container = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});

    var buttonList = goog.array.map(options[Current.ButtonList], function(currentItem) {
        var attributes = {};
        attributes['id'] = currentItem[Current.ButtonId];
        attributes['value'] = currentItem[Current.ButtonText];

        var createdButton = createAButton(attributes);

        var clickEventHandler = createTheClickEvent(createdButton,
                                                    currentItem[Current.For],
                                                    currentItem[Current.Goto],
                                                    getValue,
                                                    redirect);

        setClick(createdButton, clickEventHandler);

        return createdButton;
    });

    return container;
};
