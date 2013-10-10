goog.require('goog.dom');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');


goog.provide('src.base.control.tagContainer');


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagContainerClass = 'tagContainer';


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
src.base.control.tagContainer.TagItemDeleteClass = 'tagItemDelete';


/**
 @const
 @type {string}
 @export
 */
src.base.control.tagContainer.TagItemTextClass = 'tagItemText';


/**
 @param {Object} tagItem The tag container that will be
 affected by a tag deletion.
 @param {string} deleteUrl The url used to delete a tag.
 @param {Object} parameters The parameters used to create the list.
 Will need an id of the tag's owner from it.
 @param {function} submitToUrl The function used to submit the data.
 @param {function} removeNode The function that will remove the
 tag.
 @return {function} The delete handler.
 @protected

 */
src.base.control.tagContainer.createDeleteTagHandler = function(tagItem, deleteUrl, parameters, 
                                                                submitToUrl, removeNode) {
  return function() {
    submitToUrl(deleteUrl, parameters, function() {});
    removeNode(tagItem);
  };
};

/**
 @param {Object} parentContainer The tag container that will be
 affected by a tag deletion.
 @param {string} deleteUrl The url used to delete a tag.
 @param {function} createTag The function used to create a tag.
 @param {function} createTags The function used to create a tag for
 every item in the result list.
 @param {Object} parameters The parameters used to create the list.
 @param {function} createADiv The function used to create the various parts
 of the tag.
 @param {function} appendChild The function used to add a creeated tag to
 the tag ilst container.
 @param {function} setTextContent The functino used to set the text
 for the tag.
 @param {function} createTagDeleteHandler Create the on click delete
 handler.
 @param {function} setClick The function used to set the click event
 on the tag.
 @return {function} The create rows handler .
 @protected
 */
src.base.control.tagContainer.createRetrieveTagsHandler = function(parentContainer, deleteUrl, createTag,
                                                                   createTags, parameters, createADiv,
                                                                   appendChild, setTextContent,
                                                                   createTagDeleteHandler, setClick) {
  return function(result) {
    createTags(result, parentContainer, deleteUrl,
               createTag, parameters, createADiv,
               appendChild, setTextContent, createTagDeleteHandler,
               setClick);

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
 @param {function} appendChild The function used to add a creeated tag to
 the tag ilst container.
 @return {Object} The created tag.
 @protected
 */
src.base.control.tagContainer.createTag = function(parentContainer, parameters, tagInformation,
                                                   deleteUrl, createADiv, setTextContent, createTagDeleteHandler,
                                                   setClick, appendChild) {
  var current = src.base.control.tagContainer;
  var tagItemContainer = createADiv({'class': current.TagItemClass});
  var textContainer = createADiv({'class': current.TagItemTextClass});

  setTextContent(textContainer, tagInformation[current.TagItemName]);
  
  var deleteContainer = createADiv({'class': current.TagItemDeleteClass});
  setTextContent(deleteContainer, 'X');
  
  parameters[current.TagItemId] = tagInformation[current.TagItemId];
  var resultHandler = createTagDeleteHandler(tagItemContainer, deleteUrl, parameters,
                                             src.base.helper.domHelper.submitToUrl,
                                             goog.dom.removeNode);
  setClick(deleteContainer, resultHandler);
  
  var clearDiv = createADiv({'class': 'clearBoth'});
  
  appendChild(tagItemContainer, textContainer);
  appendChild(tagItemContainer, deleteContainer);
  appendChild(tagItemContainer, clearDiv);
  
  return tagItemContainer;
};


/**
 @param {Object} result The result from the call to get the
 tag list.
 @param {Object} parentContainer The tag container that will be
 affected by a tag deletion.
 @param {string} deleteUrl The url used to delete a tag.
 @param {function} createTag The function used to create a tag for
 every item in the result list.
 @param {Object} parameters The parameters used to create the list.
 @param {function} createADiv The function used to create the various parts
 of the tag.
 @param {function} appendChild The function used to add a creeated tag to
 the tag ilst container.
 @param {function} setTextContent The functino used to set the text
 for the tag.
 @param {function} createTagDeleteHandler Create the on click delete
 handler.
 @param {function} setClick The function used to set the click event
 on the tag.
 @protected
 */
src.base.control.tagContainer.createTags = function(result, parentContainer, deleteUrl,
                                                    createTag, parameters, createADiv,
                                                    appendChild, setTextContent, createTagDeleteHandler,
                                                    setClick) {
  var current = src.base.control.tagContainer;

  goog.array.forEach(result, function(item) {
    var newTag = createTag(parentContainer, parameters, item, deleteUrl, createADiv,
                           setTextContent, createTagDeleteHandler, setClick, appendChild);

    appendChild(parentContainer, newTag);
  });

  var clear = createADiv({'class': 'clearBoth'});
  appendChild(parentContainer, clear);
};




/**
 @param {string} parentContainerId The id of the parent container.
 @param {string} retrieveUrl The url to retrieve the tags from.
 @param {string} deleteUrl The url used to remove a tag.
 @param {Object} parameters The parameters used to get the tag list.
 @param
 {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function} createRetrieveTagHandler The function used to create the function needed to handle
 the result from retrieving the tags.
 @param {?function} submitToUrl The function that will retrieve the tags, and then build them.
 @return {Object} The created control.
 @export
 */
src.base.control.tagContainer.initialize = function(parentContainerId, retrieveUrl, deleteUrl,
                                                    parameters, createADiv, createRetrieveTagHandler,
                                                    submitToUrl) {
  var Current_ = src.base.control.tagContainer;

  createRetrieveTagHandler = createRetrieveTagHandler ?
    createRetrieveTagHandler :
    Current_.createRetrieveTagsHandler;
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;


  var container = createADiv({'id': parentContainerId, 'class': Current_.TagContainerClass });

  var retrieveTagLineHandler = createRetrieveTagHandler(container,
                                                        deleteUrl,
                                                        Current_.createTag,
                                                        Current_.createTags,
                                                        parameters,
                                                        createADiv,
                                                        goog.dom.appendChild,
                                                        goog.dom.setTextContent,
                                                        Current_.createDeleteTagHandler,
                                                        src.base.helper.events.setClick);

  submitToUrl(retrieveUrl, parameters, retrieveTagLineHandler);

  return container;
};


/**
 @param {string} name The description for the tag.
 @param {integer} id The id for the added tag.
 @param {Object} tagContainer The tag container that will be
 affected by a tag deletion.
 @param {string} deleteUrl The url used to delete a tag.
 @param {Object} parameters The parameters used to create the list.
 Will need UserId from it.
 @param {?function} createTag The function for creating the tag
 to add.
 @param {?function} getLastElementChild The function used to find the clear div.
 @param {?function} insertSiblingBefore The function used to add the
 new tag before the final clear div.
 @param {?function} appendChild The function used to add a creeated tag to
 the tag ilst container.
 @export
 */
src.base.control.tagContainer.addTagToList = function(name, id, tagContainer, deleteUrl,
                                                      parameters, createTag, getLastElementChild,
                                                      insertSiblingBefore, appendChild) {
  var Current_ = src.base.control.tagContainer;

  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  createTag = createTag ? createTag : Current_.createTag;


  getLastElementChild = getLastElementChild ? getLastElementChild : goog.dom.getLastElementChild;
  insertSiblingBefore = insertSiblingBefore ? insertSiblingBefore : goog.dom.insertSiblingBefore;

  var information = {};
  information[Current_.TagItemName] = name;
  information[Current_.TagItemId] = id;

  var tag = createTag(
    tagContainer,
    parameters,
    information,
    deleteUrl,
    src.base.helper.domCreation.div,
    goog.dom.setTextContent,
    Current_.createDeleteTagHandler,
    src.base.helper.events.setClick,
    appendChild);

  var clearDiv = getLastElementChild(tagContainer);

  insertSiblingBefore(tag, clearDiv);
};
