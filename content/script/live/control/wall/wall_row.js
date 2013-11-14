goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');

goog.provide('src.base.control.wall.row');

/**
 @protected
 */
src.base.control.wall.row.createDeletePostHandler =
  function(removeUrl, grid, submitToUrl, refresh) {
    return function(options, id) {
      var ControlConstant_ = src.base.control.controlConstant;

      var parameters = {};
      parameters[ControlConstant_.Id] = id;
    };
  };

// function(removeUrl, grid, submitToUrl, refresh, toggleBookmarkButton) {
//   return function(options, id) {
//     var ViewConstant_ = src.site.view.viewConstant;
//     var parameters = {};
//     parameters[ViewConstant_.BookmarkId] = id;

//     submitToUrl(removeUrl, parameters, function() {
//       refresh(options, grid);
//       toggleBookmarkButton(id);
//     });
//   };
// };

/** 
 @param {Object} options The overall grid options.
 @param {Object} currentItem The data row to be transformed.
 @param {string} deleteUrl The url to send the delete command
 to.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param { function} createADiv The function used to create
 the various element containers.
 @param {function} setTextContent The function used to 
 set the button text.
 @param {function} setOnClick The function used to set the 
 click handler for the delete container.
 @return {Object} The created delete container.
 @protected
 */
src.base.control.wall.row.createDeleteContainer =
  function(options, currentItem, deleteUrl, refreshGrid,
           createADiv, setTextContent, submitToUrl, setOnClick) {
    
    // setClick(removeButton, function() {
    //   var removeBookmark = options[Constant_.RemoveBookmark];
    //   removeBookmark(options, currentItem[Constant_.ResultBookmarkId]);
    // });
    
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var deleteContainerAttributes = {};
    deleteContainerAttributes[ControlConstant_.Class] = Constant_.DeleteContainer;
    var deleteContainer = createADiv(deleteContainerAttributes);
    
    setTextContent(deleteContainer,
                   Constant_.DeleteContainerText);
    //src.base.helper.events.setClick
    //Need the id and url
    //  build the call
    //submitToGetUrl
    return null;
  };


/**
 @param {Object} currentItem The data row to be transformed.
 @param {Object} options The overall grid options.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param {?function} createADiv description.
 @param {?function} createEditableDiv  The function used
 to create the text edit/entry.
 @param {?function} setTextContent The function uses to
 set the text on the text container.
 @param {?function} appendChild The function used to add
 the content to the row.
 @return {Object} The created row.
 @protected
 */
src.base.control.wall.row.createARow =
  function(currentItem, options, refreshGrid,
           createADiv, createEditableDiv, setTextContent,
           appendChild) {

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createEditableDiv = createEditableDiv ?
      createEditableDiv :
      src.base.control.editableDiv.initialize;

    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;

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

    var textContainer = createEditableDiv(currentItem[Constant_.FieldId],
                                          currentItem[Constant_.FieldText],
                                          currentItem[Constant_.FieldId],
                                          options[Constant_.EditableUrl]);

    var infoContainerAttributes = {};
    infoContainerAttributes[ControlConstant_.Class] = Constant_.WallInformation;
    var infoContainer = createADiv(infoContainerAttributes);
    setTextContent(infoContainer,
                   currentItem[Constant_.FieldUsername] +
                   ' on ' +
                   currentItem[Constant_.FieldDate]);

    appendChild(containerRow,
                infoContainer);

    appendChild(containerRow,
                textContainer);

    return containerRow;

    //create an div in the info row
    // set it to (delete id) on click
    // refresh the grid

  };
