goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.autocomplete');


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.LabelId = 'autocompleteLabel';

/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.TextboxId = 'autocompleteTextbox';


/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createATextbox The method used to create a textbox.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The created autocomplete element.
 @export
 */
src.base.control.autocomplete.initialize = function(options, createADiv, createATextbox, appendChild) {
    var Current = src.base.control.autocomplete;
    var parentContainer = createADiv({'id': options[Current.ContainerId]});
    var textbox = createATextbox({'id': Current.TextboxId});
    
    appendChild(parentContainer, textbox);
    
    var label = createADiv({'id': Current.LabelId});
    appendChild(parentContainer, label);
    
    return parentContainer;
    // var input = goog.dom.getElement(textboxName);
    // var ac = new goog.ui.ac.Remote(url, input);
    
    // goog.events.listen(input, goog.events.EventType.BLUR, function(e) { alert(e); }, true);
    // ac.setMethod('POST');
};

//create a textbox
//create a label
//create an autocomplete
//create a hidden
//set event handler for the textbox
//  allow this to be passed in
//    function(text) //convertTextToTextAndValue, textbox, hidden, label)
//      set text for textbox
//      set hidden value
//      set text for label
//      hide textbox
//      show label
