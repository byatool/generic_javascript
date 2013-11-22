goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.dropDownList');

/**
 @param {Object} select The select to fill.
 @param {?string} defaultText This is the optional text
 that will be the first item text if it is not null.
 @param {function} fillASelect The function used to fill
 a select with a list of data items.
 @return {function} The function used to update a select
 from a result.
 @protected
 */
src.base.control.dropDownList.createFillListHandler =
  function(select, defaultText, fillASelect) {
    return function(result) {
      fillASelect(select,
                  result,
                  defaultText);
    };
};


/**
 @param {string} controlId The id of the drop down list.
 @param {string} url The url for retrieving the needed items.
 @param {Array.<string>} parameters The parameters used to append
 to the url.
 @param {?string} defaultText This is the optional text that will be
 the first item text if it
 is not null.
 @param {?function} getElement Method used to find the form.
 @param {?function} submitData This is used to retrieve the data items.
 @param {?function} fillTheList This is used to set the drop down
 list with the retrieve values.
 @export
 */
src.base.control.dropDownList.initialize =
  function(controlId, url, parameters, defaultText,
           getElement, submitData, fillTheList) {
    
    getElement = getElement ?
      getElement :
      goog.dom.getElement;
    
    submitData = submitData ?
      submitData :
      src.base.helper.domHelper.submitToUrl;
    
    fillTheList = fillTheList ?
      fillTheList :
      src.base.control.dropDownList.createFillListHandler;
    
    /* Start */
    
    var dropDownList = getElement(controlId);
    var fillListHandler = fillTheList(dropDownList,
                                      defaultText,
                                      src.base.helper.domCreation.fillASelect$);
    
    submitData(url,
               parameters,
               fillListHandler);
};


