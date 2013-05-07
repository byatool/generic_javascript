goog.require('goog.debug');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.structs');
goog.require("goog.Uri.QueryData");

goog.provide('src.base.helper.domHelper');

/**
 @param {!Object} parentDiv Parent element to check for child.
 @param {number} id Id of the child.
 @return {?Object} The found child.
 @export
 */
src.base.helper.domHelper.retrieveChildById = function(parentDiv, id) {
  
  var result =
        goog.array.filter(goog.dom.getChildren(parentDiv), function(item) {
          return item.id == id;
        });
  
  if (result.length > 1) {
    throw (new goog.debug.Error('Duplicate child found.'));
  }
  
  return result.length > 0 ? result[0] : null;
};


/**
 @param {Map} mapToCheck The datamap created by retrieveFormDataMap.
 @param {string} keyName This is the element name used to retrieve the data.
 @return {?Object} The value found in the datamap, or null if nothing is found.
 @export
 */
src.base.helper.domHelper.retrieveFormDataMap = function(mapToCheck, keyName) {
  return mapToCheck.get(keyName) ? mapToCheck.get(keyName)[0] : null;
};


/**
 This is not tested since it would be difficult without dependency setup.
 @param {Object} data The form data.
 @param {function} successMethod Method to be called after submittal.
 @export
 */
src.base.helper.domHelper.submitData = function(dataMap, successMethod) {
  
  var request = new goog.net.XhrIo();
  
  goog.events.listen(request, 'complete', function(result) {
    successMethod(result.target.getResponseJson());
  });
  
  var data = goog.Uri.QueryData.createFromMap(dataMap);
  
  request.send(dataMap.action, 'POST', data.toString());
};

/**
 @export
 */
src.base.helper.domHelper.submitToUrl = function(url, paramterString, successMethod) {
  var request = new goog.net.XhrIo();
  
  goog.events.listen(request, 'complete', function(result) {
    successMethod(result.target.getResponseJson());
  });
  
  request.send(url, 'POST', paramterString);
};
