/*

 name of the control
 --  This will be the id of the hidden input

 button class
 button class selected

 containerClass

 [{text, value}]

 setClick
 addControl
 createButton
 createDiv
 createHidden


 src.base.control
 */

goog.require('goog.array');


goog.provide('src.base.control.buttonList');


/**
 @const
 @type {string}
 @export
 */
src.base.control.buttonList.ButtonOptions = 'buttonOptions';

/**
 @const
 @type {string}
 @export
 */
src.base.control.buttonList.ContainerClass = 'containerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.buttonList.ElementId = 'id';


/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @param {?function(Object, Object)} setClick The method used to set the click event.
 @param {?function(Object, string)} updateHidden The method used to update the hidden value
 when one of the buttons is pressed.
 @param {function(Object, Object)} appendChild The method used to append a child to a parent element.
 @export
 */
src.base.control.buttonList.createAButtonList = function(options, createADiv, createAHidden, createAButton,
                                                         setClick, updateHidden, appendChild) {
    var Current = src.base.control.buttonList;
    var parentContainer = createADiv({'id': options[Current.ElementId], 'class': options[Current.ContainerClass]}, null);

    var hidden = createAHidden({'id': options[Current.ElementId]});

    var createdButtons = goog.array.map(options[Current.ButtonOptions], function(currentItem) {
        var createdButton = createAButton({'type': 'button'}, currentItem['text']);
        setClick(createdButton, function() {updateHidden(hidden, currentItem['value']);});

        return createdButton;
    });

    goog.array.forEach(createdButtons, function(item) {
        appendChild(parentContainer, item);
    });
};

