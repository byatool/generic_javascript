goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.dropDownList');

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
src.base.control.dropDownList.initialize = function(controlId, url, parameters, getElement, submitData, fillTheList) {
  getElement = getElement ? getElement : goog.dom.getElement;
  submitData = submitData ? submitData : src.base.helper.domHelper.submitToUrl;
  fillTheList = fillTheList ? fillTheList : src.base.control.dropDownList.createFillListHandler;
  
  var dropDownList = getElement(controlId);
  
  submitData(url, parameters, fillTheList(dropDownList, src.base.helper.domCreation.fillASelect$));
};

