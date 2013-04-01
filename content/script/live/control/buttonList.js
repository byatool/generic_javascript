goog.require('goog.array');
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


//Support Methods
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
 */
src.base.control.buttonList.updateHidden = function(hiddenElement, value, getValue, isEmptySafe, setValue, contains, removeValue) {
    
    var currentValue = getValue(hiddenElement);
    currentValue = isEmptySafe(currentValue) ? '' : currentValue;

    if (contains(currentValue, value)) {
        currentValue = removeValue(value, currentValue);
        setValue(hiddenElement, currentValue);
    }
    else {
        setValue(hiddenElement, value + ' ' + currentValue);
    }
};

//Exported Methods
/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @param {?function(Object, Object)} setClick The method used to set the click event.
 @param {?function(Object, string)} setValue The method used to set the value of an element.
 @param {?function(Object, string)} updateHidden The method used to update the hidden value
 when one of the buttons is pressed.
 @param {function(Object, Object)} appendChild The method used to append a child to a parent element.
 @export
 */
src.base.control.buttonList.createAButtonList = function(options, createADiv, createAHidden, createAButton,
                                                         setClick, setValue, updateHidden, appendChild) {
    var Current = src.base.control.buttonList;
    
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createAHidden = createAHidden ? createAHidden : src.base.helper.domCreation.hidden;
    createAButton = createAButton ? createAButton : src.base.helper.domCreation.button;
    setClick = setClick ? setClick : src.base.helper.events.setClick;
    setValue = setValue ? setValue : goog.dom.forms.setValue;
    updateHidden = updateHidden ? updateHidden : Current.updateHidden;
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    
    var parentContainer = createADiv({'id': options[Current.ElementId], 'class': options[Current.ContainerClass]}, null);

    //TOTEST Actually append the child
    var hidden = createAHidden({'id': options[Current.ElementId]});
    appendChild(parentContainer, hidden);
    var createdButtons = goog.array.map(options[Current.ButtonOptions], function(currentItem) {
        var createdButton = createAButton({'type': 'button'}, currentItem['text']);
        
        //TODO: Actual values sent are untested.
        //TODO: Pull methods into parameters when testing solution is found.
        setClick(createdButton, function() {
            updateHidden(hidden,
                         currentItem['value'],
                         goog.dom.forms.getValue,
                         goog.string.isEmptySafe,
                         updateHidden,
                         goog.string.contains,
                         goog.string.remove);
            
            //TOTEST: change the button class
        });
        
        return createdButton;
    });
    
    goog.array.forEach(createdButtons, function(item) {
        appendChild(parentContainer, item);
    });
    //TOTEST Returning something
    return parentContainer;
};



