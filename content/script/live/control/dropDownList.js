goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.json');

goog.provide('src.base.control.dropDownList');


/**
 @private
 */
src.base.control.dropDownList.toUseful_ = function(item) {
  var itemResult = '';
  
  for(var name in item) {
    itemResult += name + '=' + item[name] + '&';
  }
  
  return itemResult;
};

/**
 @param {Array.<string, string>} parameters The parameter map.
 @return {string} The created request parameter string.
 @export
 */
src.base.control.dropDownList.createRequestParameterText = function(parameters) {
  var result = '?';
  //remove last &
  return goog.array.reduce(parameters, function(also, parameter) {
    return result += src.base.control.dropDownList.toUseful_(parameter);
  });
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
src.base.control.dropDownList.initialize = function(controlId, url, parameters, getElement, createRequestParameterText, submitData, fillTheList){
  var Current = src.base.control.dropDownList;
  
  getElement = getElement ? getElement : goog.dom.getElement;
  createRequestParameterText = createRequestParameterText ? createRequestParameterText : null;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitData;
  fillTheList = fillTheList ? fillTheList : null; //This will have to create a method that will handle the response
  
  var requestParameterString = createRequestParameterText(parameters);
  var dropDownList = getElement(controlId);
  
  submitData(url, requestParameterString, fillTheList(dropDownList));
};
  
