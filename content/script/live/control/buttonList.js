goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string');

goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');

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
 @const
 @type {string}
 @export
 */
src.base.control.buttonList.SelectedButtonClass = 'selectedButton';

//Support Methods

/**
 @param {Object} element The element to have the css toggled.
 @param {string} cssClass The css class to toggle.
 @param {function(Object, string)} toggle The method to call to toggle.
 @return {function} The method created to handle the toggle functionality.
 */
src.base.control.buttonList.toggleClass = function(element, cssClass, toggle) {
    return function() { toggle(element, cssClass);};
};

/**
 @param {Object} hiddenElement A hidden input element.
 @param {string} value The new value to add or remove.
 @param {function(Object, ?string)} getValue The method used to get an input value.
 @param {function(?string) : boolean} isEmptySafe The method used to see if a string is
 neither empty or undefined.
 @param {function(Object, string)} setValue The method used to set a value on an
 input element.
 @param {function(string, string) : boolean} contains The method used to find a string in a string.
 @param {function(Object, string)} removeValue The method used to remove a string from a string.
 @return {function()} The method that wraps the update call.
 */
src.base.control.buttonList.updateHidden = function(hiddenElement, value, getValue, isEmptySafe, setValue, contains, removeValue) {
    return function() {
        var currentValue = getValue(hiddenElement);
        currentValue = isEmptySafe(currentValue) ? '' : currentValue;
        
        if (contains(currentValue, value)) {
            currentValue = removeValue(currentValue, value);
            setValue(hiddenElement, currentValue);
        }
        else {
            setValue(hiddenElement, value + ' ' + currentValue);
        }
    };
};

//Exported Methods
/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @param {?function(Object, Object)} setClick The method used to set the click event.
 @param {?function(Object, string)} setValue The method used to set the value of an element.
 @param {?function(Object, string) : function } updateHidden The method that returns a method to
 be called when one of the buttons is pressed.
 @param {?function(Object, string) : function} toggleClass The method used to create a method to add
 or remove a css class.
 @param {function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The created button list.
 @export
 */
src.base.control.buttonList.createAButtonList = function(options, createADiv, createAHidden, createAButton,
                                                         setClick, setValue, updateHidden, toggleClass, appendChild) {
    var Current = src.base.control.buttonList;
    
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createAHidden = createAHidden ? createAHidden : src.base.helper.domCreation.hidden;
    createAButton = createAButton ? createAButton : src.base.helper.domCreation.button;
    setClick = setClick ? setClick : src.base.helper.events.setClick;
    setValue = setValue ? setValue : goog.dom.forms.setValue;
    updateHidden = updateHidden ? updateHidden : Current.updateHidden;
    toggleClass = toggleClass ? toggleClass : Current.toggleClass;
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    
    
    var parentContainer = createADiv({'id': options[Current.ElementId], 'class': options[Current.ContainerClass]}, null);
    
    var hidden = createAHidden({'id': options[Current.ElementId]});
    appendChild(parentContainer, hidden);
    
    var createdButtons = goog.array.map(options[Current.ButtonOptions], function(currentItem) {
        
        //TOTEST: set intial class?
        var createdButton = createAButton({'type': 'button'}, currentItem['text']);
        
        var hiddenChange = updateHidden(hidden,
                                        currentItem['value'],
                                        goog.dom.forms.getValue,
                                        goog.string.isEmptySafe,
                                        goog.dom.forms.setValue,
                                        goog.string.contains,
                                        goog.string.removeAll);
        //Does not exist yet.
        var toggle = toggleClass(createdButton, options[Current.SelectedButtonClass], goog.dom.classes.toggle);
        
        setClick(createdButton, function() {
            hiddenChange();
            toggle();
        });
        
        return createdButton;
    });
    
    goog.array.forEach(createdButtons, function(item) {
        appendChild(parentContainer, item);
    });
    
    return parentContainer;
};



