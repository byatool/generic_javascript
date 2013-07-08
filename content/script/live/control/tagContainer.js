goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');

goog.provide('src.base.control.tagContainer');



/**
 
 */

//createTagControlsFromList(list, createADiv, onDelete?)
// for each item in list
//   create name container
//   create x container
//     set x container click to onDelete

//  setClick = setClick ? setClick : src.base.helper.events.setClick;
//    setClick(createdButton, clickEventHandler);


/**
 @param {string} parentContainerId The id of the parent container.
 @param {string} url The url to retrieve the tags from.
 @param {Object} parameters The parameters used to get the tag list.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function} createTheTagListHandler The function used to create the function needed to handle
 the result from retrieving the tags.
 @param {?function} submitToUrl The function that will retrieve the tags, and then build them.
 @return {Object} The created control.
 @export
 */
src.base.control.tagContainer.initialize = function(parentContainerId, url, parameters, createADiv,
                                                    createTheTagListHandler, submitToUrl) {
  Current_ = src.base.control.tagContainer;
   
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;
  //createTheTagListHandler
  
  var Current_ = src.base.control.tagContainer;
  
  var container = createADiv({'id': parentContainerId });
  
  var retrieveTagLineHandler = createTheTagListHandler(container);//might take createADiv...
  
  submitToUrl(url, parameters, retrieveTagLineHandler);
  
  return container;
};

