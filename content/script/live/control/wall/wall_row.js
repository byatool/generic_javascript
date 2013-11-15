goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');

goog.provide('src.base.control.wall.row');



/**
 @param {Object} options The overall grid options.
 @param {Object} currentItem The data row to be transformed.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param {?function} createDeleteContainer The function used
 to create the delete div.
 @param { function} createADiv The function used to create
 the various element containers.
 @param {?function} setTextContent The function uses to
 set the text on the text container.
 @param {function} createClearDiv The function used to 
 create a clear:both div.
 @param {function} appendChild The function used to add
 the text, and delete containers to the parent.
 @return {Object} The created row information container.
 @protected
 */
src.base.control.wall.row.createRowInformationContainer =
  function(options, currentItem, refreshGrid,
           createDeleteContainer, createADiv,
           setTextContent, createClearDiv,
           appendChild) {
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var infoContainerAttributes = {};
    infoContainerAttributes[ControlConstant_.Class] = Constant_.WallInformation;
    var infoContainer = createADiv(infoContainerAttributes);
    
    var wallInformationTextAttributes = {};
    wallInformationTextAttributes[ControlConstant_.Class] = Constant_.WallInformationText;
    var wallInformationText = createADiv(wallInformationTextAttributes);
    
    setTextContent(wallInformationText,
                   currentItem[Constant_.FieldUsername] +
                   ' on ' +
                   currentItem[Constant_.FieldDate]);
    
    var deleteContainer = createDeleteContainer(currentItem,
                                                options[Constant_.DeleteUrl],
                                                refreshGrid,
                                                createADiv,
                                                setTextContent,
                                                src.base.control.wall.row.createDeletePostHandler,
                                                src.base.helper.events.setClick);
    
    appendChild(infoContainer,
                wallInformationText);
    
    appendChild(infoContainer,
                deleteContainer);
    
    appendChild(infoContainer,
                createClearDiv());
    
    return infoContainer;
  };



/**
 @param {string} removeUrl The url needed to post the
 remove to.
 @param {function} submitToUrl The function used to
 post the delete with.
 @param {function} refresh The function used to refresh
 the grid.
 @return {function} The delete post handler.
 @protected
 */
src.base.control.wall.row.createDeletePostHandler =
  function(removeUrl, submitToUrl, refresh) {
    return function(id) {
      var ControlConstant_ = src.base.control.controlConstant;
      
      var parameters = {};
      parameters[ControlConstant_.Id] = id;
      
      submitToUrl(removeUrl,
                  parameters,
                  function(result) { refresh(); });
    };
  };


/**
 @param {Object} currentItem The data row to be transformed.
 @param {string} deleteUrl The url to send the delete command
 to.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param { function} createADiv The function used to create
 the various element containers.
 @param {function} setTextContent The function used to
 set the button text.
 @param {function} createDeletePostHandler The function used
 to create the delete function.
 @param {function} setOnClick The function used to set the
 click handler for the delete container.
 @return {Object} The created delete container.
 @protected
 */
src.base.control.wall.row.createDeleteContainer =
  function(currentItem, deleteUrl, refreshGrid,
           createADiv, setTextContent, createDeletePostHandler,
           setOnClick) {
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var deleteContainerAttributes = {};
    deleteContainerAttributes[ControlConstant_.Class] = Constant_.DeleteContainer;
    var deleteContainer = createADiv(deleteContainerAttributes);
    
    setTextContent(deleteContainer,
                   Constant_.DeleteContainerText);
    
    
    var deleteHandler = createDeletePostHandler(deleteUrl,
                                                src.base.helper.domHelper.submitToUrl,
                                                refreshGrid);
    
    
    setOnClick(deleteContainer,
               function() {
                 deleteHandler(currentItem[Constant_.FieldId]);
               });
    
    return deleteContainer;
  };


/**
 @param {Object} currentItem The data row to be transformed.
 @param {Object} options The overall grid options.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param {?function} createADiv description.
 @param {?function} createEditableDiv  The function used
 to create the text edit/entry.
 @param {?function} createRowInformationContainer The function
 used to create the information/delete container.
 @param {?function} appendChild The function used to add
 the content to the row.
 @return {Object} The created row.
 @protected
 */
src.base.control.wall.row.createARow =
  function(currentItem, options, refreshGrid,
           createADiv, createEditableDiv,
           createRowInformationContainer, appendChild) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createEditableDiv = createEditableDiv ?
      createEditableDiv :
      src.base.control.editableDiv.initialize;
    
    createRowInformationContainer = createRowInformationContainer ? 
      createRowInformationContainer : 
      src.base.control.wall.row.createRowInformationContainer;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* Start */
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
    
    
    var containerRowAttributes = {};
    containerRowAttributes[ControlConstant_.Class] = GridBuilderConstant_.RowClass;
    var containerRow = createADiv(containerRowAttributes);
    
    var informationContainer = createRowInformationContainer(options,
                                                             currentItem,
                                                             refreshGrid,
                                                             src.base.control.wall.row.createDeleteContainer,
                                                             createADiv,
                                                             goog.dom.setTextContent,
                                                             src.base.helper.domCreation.createAClearDiv,
                                                             appendChild);
    
    
    var textContainer = createEditableDiv(currentItem[Constant_.FieldId],
                                          currentItem[Constant_.FieldText],
                                          currentItem[Constant_.FieldId],
                                          options[Constant_.EditableUrl]);
    
    appendChild(containerRow,
                informationContainer);

    appendChild(containerRow,
                textContainer);

    return containerRow;
  };
