goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.dom.forms');
goog.require('src.base.helper.domCreation');
goog.require('src.base.control.redirectList.constant');

goog.provide('src.base.control.redirectList');


/**
 @param {string} id The intended button id.
 @param {string} text The button text.
 @param {Array.<string>} controlIds The controls to get the value from.
 @param {string} url The url the button should redirect to.
 @param {boolean} disabled Whether the button should be enabled.
 @return {Object} The created redirect button option.
 @export
 */
src.base.control.redirectList.createRedirectButtonOptions =
  function(id, text, controlIds, url, disabled) {
    var Constant_ = src.base.control.redirectList.constant;
    
    var button = {};
    
    button[Constant_.ButtonId] = id;
    button[Constant_.ButtonText] = text;
    button[Constant_.For] = controlIds;
    button[Constant_.Goto] = url;
    button[Constant_.Disabled] = disabled ? disabled : false;
    
    return button;
  };


/**
 @param {string} elementIds The name of the elements that hold the
 needed values.
 @param {string} url The intended destination.
 @param {function} map The function used to create a url.
 @param {function} getValue The method used to get the value from the
 "sister" control.
 @param {function} getElement description.
 @param {function} reduce The function used to create a parameter 
 string form a key value list.
 @param {function} removeAt The function used to strip a trailing &
 on the query string.
 @param {function} redirect The method used to change the current url.
 @return {function} The created click event.
 @export
 */
src.base.control.redirectList.createTheClickEvent =
  function(elementIds, url, map, getValue, getElement,
           reduce, removeAt, redirect) {
    
    return function() {
       
      if(elementIds) {
        var values = map(elementIds, function(currentItem) {
          var element = getElement(currentItem);
          var value = getValue(element);
          return [currentItem,value];
        });
        
        var parameterString = reduce(values, function(left, right) {
          return left + right[0] + '=' + right[1] + '&';
        }, '');
        
        var finalParameterString = removeAt(parameterString,
                                            parameterString.length - 1, 1);
        
        redirect(url + '?' + finalParameterString);
      }
      else {
        redirect(url);
      }
      
    };
};


/**
 @param {Object} options The collection of options to build the customize
 the control.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createAButton The method used to create a button.
 @param {?function} createTheClickEvent The method
 compose the click handler for a created button.
 @param {?function} getValue The method used to get the value from the
 "sister" control.
 @param {?function} getElement description.
 @param {?function} redirect The method used to change the current url.
 @param {?function} setClick The method used to set the click event.
 @param {?function} appendChild The method used to append a child to a
 parent element.
 @return {Object} The control.
 @export
 */
src.base.control.redirectList.initialize =
  function(options, createADiv, createAButton,
           createTheClickEvent, getValue, getElement,
           redirect, setClick, appendChild) {
    
    
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;
    
    createTheClickEvent = createTheClickEvent ?
      createTheClickEvent :
      src.base.control.redirectList.createTheClickEvent;
    
    getElement = getElement ?
      getElement :
      goog.dom.getElement;
    
    getValue = getValue ?
      getValue :
      goog.dom.forms.getValue;

    //TODO Probably should create a utility method that wraps window.location
    //  instead of doing it inline.
    redirect = redirect ?
      redirect :
      function(item) { window.location = item; };
    
    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;
    
    
    /* START */
    
    var Constant_ = src.base.control.redirectList.constant;
    var Current_ = src.base.control.redirectList;
    
    var container = createADiv({
      'id': options[Constant_.ContainerId],
      'class': options[Constant_.ContainerClass]
    });
    
    //BAD Map should be injected
    var buttonList = goog.array.map(options[Constant_.ButtonList], function(currentItem) {
      var createdButton = createAButton(
        {'id': currentItem[Constant_.ButtonId],
         'type': 'button',
         'disabled' : currentItem[Constant_.Disabled] ? 'disabled' : undefined,
         'class' : currentItem[Constant_.Disabled] ? 'disabled' : undefined
        }, currentItem[Constant_.ButtonText]);
      
      
      var clickEventHandler = createTheClickEvent(currentItem[Constant_.For],
                                                  currentItem[Constant_.Goto],
                                                  goog.array.map,
                                                  getValue,
                                                  getElement,
                                                  goog.array.reduce,
                                                  goog.string.removeAt,
                                                  redirect);
      
      setClick(createdButton, clickEventHandler);
      
      return createdButton;
    });
    
    goog.array.forEach(buttonList, function(item) {
      appendChild(container, item);
    });
    
    return container;
};
