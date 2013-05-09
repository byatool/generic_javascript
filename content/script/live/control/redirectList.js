goog.require('goog.array');
goog.require('goog.dom.forms');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.redirectList');

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
 @param {string} id The intended button id.
 @param {string} text The button text.
 @param {Array.<string>} controlIds The controls to get the value from.
 @param {string} url The url the button should redirect to.
 @return {Object} The created redirect button option.
 @export
 */
src.base.control.redirectList.createRedirectButtonOptions = function(id, text, controlIds, url) {
  var button = {};
  
  button[src.base.control.redirectList.ButtonId] = id;
  button[src.base.control.redirectList.ButtonText] = text;
  button[src.base.control.redirectList.For] = controlIds;
  button[src.base.control.redirectList.Goto] = url;
  
  return button;
};


/**
 @param {string} elementIds The name of the elements that hold the needed values.
 @param {string} url The intended destination.
 @param {function(Object) : string} getValue The method used to get the value from the "sister" control.
 @param {function(string) : Object} getElement description.
 @param {function(string)} redirect The method used to change the current url.
 @return {function} The created click event.
 @export
 */
src.base.control.redirectList.createTheClickEvent = function(elementIds, url, getValue, getElement, redirect) {
    return function() {
        var firstTime = true;

        var values = goog.array.map(elementIds, function(currentItem) {
            //TODO This might need to be a function
            var element = getElement(currentItem);
            var value = getValue(element);
          
            var result = (firstTime ? '?' : '&') + currentItem + '=' + value;
            firstTime = false;
          
            return result;
        });
      
        var finalText = goog.array.reduce(values, function(left, right) {
            return left + right;
        }, '');
      
        redirect(url + finalText);
    };
};


/**
 @param {Object} options The collection of options to build the customize the control.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @param {?function(Object, string, string, function, function) : function} createTheClickEvent The method
 compose the click handler for a created button.
 @param {?function(Object) : string} getValue The method used to get the value from the "sister" control.
 @param {?function(string) : Object} getElement description.
 @param {?function(string)} redirect The method used to change the current url.
 @param {?function(Object, Object)} setClick The method used to set the click event.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @return {Object} The control.
 @export
 */
src.base.control.redirectList.initialize = function(options, createADiv, createAButton, createTheClickEvent, getValue, getElement, redirect, setClick, appendChild) {
    var Current = src.base.control.redirectList;
  
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createAButton = createAButton ? createAButton : src.base.helper.domCreation.button;
    createTheClickEvent = createTheClickEvent ? createTheClickEvent : Current.createTheClickEvent;
    getElement = getElement ? getElement : goog.dom.getElement;
    getValue = getValue ? getValue : goog.dom.forms.getValue;
  
    //TODO Probably should create a utility method that wraps window.location
    //  instead of doing it inline.
    redirect = redirect ? redirect : function(item) { window.location = item; };
  
    setClick = setClick ? setClick : src.base.helper.events.setClick;
  
    var container = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  
    var buttonList = goog.array.map(options[Current.ButtonList], function(currentItem) {
        var createdButton = createAButton({'id': currentItem[Current.ButtonId], 'type': 'button'},
                                          currentItem[Current.ButtonText]);

        var clickEventHandler = createTheClickEvent(currentItem[Current.For],
                                                    currentItem[Current.Goto],
                                                    getValue,
                                                    getElement,
                                                    redirect);

        setClick(createdButton, clickEventHandler);

        return createdButton;
    });

    goog.array.forEach(buttonList, function(item) {
        appendChild(container, item);
    });

    return container;
};
