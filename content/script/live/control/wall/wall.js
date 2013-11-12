goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.form');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.wall');


/**
 @param {Object} currentItem The data row to be transformed.
 @param {Object} options The overall grid options.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @protected
 */
src.base.control.wall.createARow =
  function(currentItem, options, refreshGrid,
           createADiv) {
    
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    
    /* Start */
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var containerRowAttributes = {};
    containerRowAttributes[ControlConstant_.Class] = Constant_.WallRow;
    containerRowAttributes[ControlConstant_.Id] = Constant_.WallRow;
    var containerRow = createADiv(containerRowAttributes);
    
    
    
    return null;
    //id text subject date
    // "options[src.base.control.gridBuilder.constant.Map] = ["
    // "  { 'headerText': 'Last Name', 'propertyName': 'LastName', 'class': 'short' },"
    // "  { 'headerText': 'First Name', 'propertyName': 'FirstName', 'class': 'short' },"
    // "  { 'headerText': 'Email Address', 'propertyName': 'Email', 'class': 'long' },"
    // "  { 'headerText': 'Social Security Number', 'propertyName': 'Ssn', 'class': 'medium' }"
    
    
  };


/**
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url the form will post to.
 @param {string} retrieveItemsUrl The function used retrieve the
 items for the grid.
 @param {integer} subjectId The id for the parent subject to which
 the items are added to, and found by.
 @param {?function} createADiv The method used  to create a 
 div element.
 @param {?function} createTheForm The function used to create
 the inner form.
 @param {?function} appendChild The function used to add the elements
 to the created parent container.
 @param {?function} initializeTheForm The fuction used to set up
 the created form.
 @return {Object} The created control.
 @export
 */
src.base.control.wall.initialize = 
  function(containerId, postTo, retrieveItemsUrl, subjectId,
           createADiv, createTheForm, createTheGrid,
           appendChild, initializeTheForm) {
    
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
    
    initializeTheForm = initializeTheForm ? 
      initializeTheForm : 
      src.base.control.wall.form.initialize;
    
    
    /* START */
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.wall;
    var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    //Form
    var entryForm = createTheForm(postTo,
                                  subjectId);
    
    
    //Grid
    
    var gridOptions = {};
    var parameters = {};
    parameters[Constant_.SubjectId] = subjectId;
    parameters[ControlConstant_.Page] = 0;
    gridOptions[GridBuilderConstant_.ContainerClass] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.ContainerId] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.Parameters] = parameters;
    gridOptions[GridBuilderConstant_.ShowHeader] = false;
    gridOptions[GridBuilderConstant_.Url] = retrieveItemsUrl;
    
    var gridResult = createTheGrid(gridOptions);
    
    appendChild(container,
                entryForm);
    
    appendChild(container,
                gridResult[ControlConstant_.CreatedControl]);
    
    
    //onSubmit = function() {
    //  refreshGrid(grid, options)
    // }
    initializeTheForm(entryForm,
                      function() {});
    
    return container;
  };


//form
//  text  button

//grid builder
//  refesh on form submit
