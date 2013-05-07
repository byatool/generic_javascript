goog.require('goog.array');
goog.require('goog.dom');
goog.provide('src.base.control.dropDownList');
goog.require('src.base.helper.domCreation');


/**
 @param {Array.<Object>} item The array of parameters needed for the request.
 @return {string} This is the string for a url created from the parameters.
 @private
 */
src.base.control.dropDownList.toUseful_ = function(item) {
  var itemResult = '';

  for (var name in item) {
    itemResult += name + '=' + item[name] + '&';
  }

  return itemResult;
};


/**
 @param {Array.<string, string>} parameters The parameter map.
 @return {string} The created request parameter string.
 @protected
 */
src.base.control.dropDownList.createRequestParameterText = function(parameters) {
  var result = goog.array.reduce(parameters, function(also, parameter) {
    return also += src.base.control.dropDownList.toUseful_(parameter);
  }, '?');
  
  return result.substring(0, result.length - 1);
};


/**
 @param {Object} select The select to fill.
 @param {function(Object, Array.<Object>} fillASelect The function used to fill
 a select with a list of data items.
 @return {function(Object)} The function used to update a select from a result.
 @protected
 */
src.base.control.dropDownList.createFillListHandler = function(select, fillASelect) {
  return function(result) {
    fillASelect(select, result);
  };
};


/**
 
 @param {string} controlId The id of the drop down list.
 @param {string} url The url for retrieving the needed items.
 @param {Array.<string>} parameters The parameters used to append to the url.
 @param {?function(string) : Object} getElement Method used to find the form.
 @param {?function(Array.<string>) : string} createRequestParameterText This is used to create a request
 parameter string.
 @param {?function(string, string, function} submitData This is used to retrieve the data items.
 @param {?function} fillTheList This is used to set the drop down list with the retrieve values.
 @export
 */
src.base.control.dropDownList.initialize = function(controlId, url, parameters, getElement, createRequestParameterText, submitData, fillTheList) {
  getElement = getElement ? getElement : goog.dom.getElement;
  createRequestParameterText = createRequestParameterText ? createRequestParameterText : src.base.control.dropDownList.createRequestParameterText;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitToUrl;
  fillTheList = fillTheList ? fillTheList : src.base.control.dropDownList.createFillListHandler;
  
  var requestParameterString = createRequestParameterText(parameters);
  var dropDownList = getElement(controlId);
  
  submitData(url, requestParameterString, fillTheList(dropDownList, src.base.helper.domCreation.fillASelect$));
};

