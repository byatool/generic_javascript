goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.provide('src.base.control.refreshPair');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');
/* Support Functions */

/**
 @param {string} url The url to submit to.
 @param {Object} elementToWatch The element needed for the request paramter.
 @param {function} getValue The method used to get the element value.
 @param {function} submitToUrl The function used to submit the request.
 @param {function} submitResultHandler The handler for the returned result.
 @return {function} The function to handle the change event.
 @protected
 */
src.base.control.refreshPair.createOnChangeHandler = function(url, elementToWatch, getValue, submitToUrl, submitResultHandler) {
  return function() {
    var parameter = {};
    var elementId = elementToWatch['id'];

    parameter[elementId] = getValue(elementToWatch);
    submitToUrl(url, parameter, submitResultHandler);
  };
};


/**
 @param {Object} elementToUpdate The element updated byt the created handler.
 @param {?function} setValue The method used to set an element's value.
 @return {function} The created submit handler function.
 @protected
 */
src.base.control.refreshPair.createTheUrlSubmitHandler = function(elementToUpdate, setValue) {
  return function(result) {
    setValue(elementToUpdate, result);
  };
};


/* Exports */

/**
 @param {string} toWatch The id of the element to watch.
 @param {string} toUpdate The id of the element that needs to be updated
 on the toWatch's change.
 @param {string} url description.
 @param {?function} getElement Method for getting an element by id.
 @param {?function} getValue The method used to get an element value.
 @param {?function} createUrlSubmitHandler description.
 @param {?function} setValue The method used to set an element's value.
 @param {?function} createOnChangeHandler description.
 @param {?function} setOnChange description.
 @param {?function} submitToUrl description.
 @export
 */
src.base.control.refreshPair.initialize = function(toWatch, toUpdate, url, getElement, getValue, createUrlSubmitHandler, setValue, createOnChangeHandler, setOnChange, submitToUrl) {
  createOnChangeHandler = createOnChangeHandler ? createOnChangeHandler : src.base.control.refreshPair.createOnChangeHandler;
  createUrlSubmitHandler = createUrlSubmitHandler ? createUrlSubmitHandler : src.base.control.refreshPair.createTheUrlSubmitHandler;
  getElement = getElement ? getElement : goog.dom.getElement;
  getValue = getValue ? getValue : goog.dom.forms.getValue;
  setOnChange = setOnChange ? setOnChange : src.base.helper.events.setOnBlur;
  submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;
  setValue = setValue ? setValue : goog.dom.forms.setValue;
  
  
  /* Actual Code */
  
  var elementToWatch = getElement(toWatch);
  var elementToUpdate = getElement(toUpdate);
  var submitResultHandler = createUrlSubmitHandler(elementToUpdate, setValue);
  var onChangeHandler = createOnChangeHandler(url, elementToWatch, getValue, submitToUrl, submitResultHandler);
  
  setOnChange(elementToWatch, onChangeHandler);
};
