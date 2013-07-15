goog.require('goog.dom');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');

goog.provide('src.base.control.tagContainer');


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagItemClass = 'tagItem';


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagItemId = 'Id';


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagItemName = 'Name';


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagItemTextClass = 'tagItemText';


// src.base.control.tagContainer.refreshTagList = function(container, url, parameters){

//   //creat a hanlder ot update the container
//   //submit to the url
// };


/**
 @param {Object} tagItem The tag container that will be
 affected by a tag deletion.
 @param {string} deleteUrl The url used to delete a tag.
 @param {Object} parameters The parameters used to create the list.
 Will need UserId from it.
 @param {function} submitToUrl The function used to submit the data.
 @param {function} removeNode The function that will remove the
 tag.
 @return {function} The delete handler.
 @protected
 
 */
src.base.control.tagContainer.createDeleteTagHandler = function(tagItem, deleteUrl, parameters, 
                                                                submitToUrl, removeNode) {
  return function(){
    submitToUrl(deleteUrl, parameters, function(){});
    removeNode(tagItem);
  };
};



/**
 @param {Object} parentContainer The tag container that will be
 affected by a tag deletion.
 @param {Object} parameters The parameters used to create the list.
 Will need UserId from it.
 @param {Object} tagInformation The name, and if of the tag being represented.
 @param {string} deleteUrl The url used to delete a tag.
  @param {function} createADiv The function used to create the various parts
 of the tag.
 @param {function} setTextContent The functino used to set the text
 for the tag.
 @param {function} createTagDeleteHandler Create the on click delete
 handler.
 @param {function} setClick The function used to set the click event
 on the tag.
 @return {Object} The created tag.
 @protected
 */
src.base.control.tagContainer.createTag = function(parentContainer, parameters, tagInformation,
                                                   deleteUrl, createADiv, setTextContent, createTagDeleteHandler,
                                                   setClick){
  var current = src.base.control.tagContainer;
  var tagItemContainer = createADiv({'class':current.TagItemClass});
  var textContainer = createADiv({'class':current.TagItemTextClass});
  
  setTextContent(textContainer, tagInformation[current.TagItemName]);
  
  var deleteContainer = createADiv({});
  setTextContent(deleteContainer, 'X');
  
  parameters[current.TagItemId] = tagInformation[current.TagItemId];
  var resultHandler = createTagDeleteHandler(tagItemContainer, deleteUrl, parameters,
                                             src.base.helper.domHelper.submitToUrl,
                                             goog.dom.removeNode);
  setClick(deleteContainer, resultHandler);
  
  
  return tagItemContainer;
};



// src.base.control.tagContainer.removeTag = function(container, tag, url, parameters){
//   //add tag id to the parameters object
//   //fire off the post for deletion
//   //remove the tag from the container
//   //  May not need to handle the post result... dead end
// };




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

