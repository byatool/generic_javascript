goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.form');
goog.require('src.base.control.wall.row');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.wall');

 /**
 @return {Object} The list with one empty mapping item.
 @protected
 */
src.base.control.wall.createTheMapping =
  function() {
    
    var ControlConstant_ = src.base.control.controlConstant;
    var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
    
    var emptyMapping = {};
    emptyMapping[GridBuilderConstant_.HeaderText] = '';
    emptyMapping[GridBuilderConstant_.PropertyName] = '';
    emptyMapping[ControlConstant_.Class] = '';
    
    return [emptyMapping];
  };


/**
 @param {Object} document The document object used to set key
 board short cuts.
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url the form will post to.
 @param {string} retrieveItemsUrl The function used retrieve the
 items for the grid.
 @param {string} deleteUrl The url used for deleting a post.
 @param {integer} subjectId The id for the parent subject to which
 the items are added to, and found by.
 @param {string} editableUrl The url for posting edits to existing posts.
 @param {?function} createADiv The method used  to create a
 div element.
 @param {?function} createTheForm The function used to create
 the inner form.
 @param {?function} createTheGrid The function used to create the
 grid that will display all the posts.
 @param {?function} appendChild The function used to add the elements
 to the created parent container.
 @param {?function} createTheMapping The function used to create the
 mapping shell for the grid.
 @param {?function} refreshGrid The function used to refresh the
 created grid on form submit.
 @param {?function} initializeTheForm The fuction used to set up
 the created form.
 @return {Object} The created control.
 @export
 */
src.base.control.wall.initialize =
  function(document, containerId, postTo, retrieveItemsUrl, deleteUrl,
           subjectId, editableUrl, createADiv, createTheForm,
           createTheGrid, appendChild, createTheMapping,
           refreshGrid, initializeTheForm) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createTheForm = createTheForm ?
      createTheForm :
      src.base.control.wall.form.create;
    
    createTheGrid = createTheGrid ?
      createTheGrid :
      src.base.control.gridBuilder.initialize;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    createTheMapping = createTheMapping ?
      createTheMapping :
      src.base.control.wall.createTheMapping;
    
    refreshGrid = refreshGrid ?
      refreshGrid :
      src.base.control.gridBuilder.refresh;
    
    initializeTheForm = initializeTheForm ?
      initializeTheForm :
      src.base.control.wall.form.initialize;
    
    
    /* START */
    
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.wall;
    var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    //Form
    var entryForm = createTheForm(document, 
                                  postTo,
                                  subjectId);
     //Grid

    var gridOptions = {};
    var parameters = {};
    var mapping = createTheMapping();
    parameters[Constant_.SubjectId] = subjectId;
    parameters[ControlConstant_.Page] = 0;
    gridOptions[GridBuilderConstant_.ContainerClass] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.ContainerId] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.CreateARow] = src.base.control.wall.row.createARow;
    gridOptions[Constant_.DeleteUrl] = deleteUrl;
    gridOptions[Constant_.EditableUrl] = editableUrl;
    gridOptions[GridBuilderConstant_.Map] = mapping;
    gridOptions[GridBuilderConstant_.Parameters] = parameters;
    gridOptions[GridBuilderConstant_.ShowHeader] = false;
    gridOptions[GridBuilderConstant_.Url] = retrieveItemsUrl;

    var gridResult = createTheGrid(gridOptions);

    appendChild(container,
                entryForm);

    appendChild(container,
                gridResult[ControlConstant_.CreatedControl]);

    initializeTheForm(entryForm,
                      function() {
                        refreshGrid(gridResult[ControlConstant_.CreatedOptions],
                                    gridResult[ControlConstant_.CreatedControl]);
                      });

    return container;
  };
