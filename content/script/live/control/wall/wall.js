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
 @param {?function} createADiv description.
 @param {?function} setTextContent The function uses to
 set the text on the text container.
 @param {?function} appendChild The function used to add
 the content to the row.
 @return {Object} The created row.
 @protected
 */
src.base.control.wall.createARow =
  function(currentItem, options, refreshGrid,
           createADiv, setTextContent, appendChild) {

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

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


    var textContainerAttributes = {};
    textContainerAttributes[ControlConstant_.Class] = Constant_.WallText;
    var textContainer = createADiv(textContainerAttributes);
    setTextContent(textContainer,
                   currentItem[Constant_.FieldText]);



    var infoContainerAttributes = {};
    infoContainerAttributes[ControlConstant_.Class] = Constant_.WallInformation;
    var infoContainer = createADiv(infoContainerAttributes);
    setTextContent(infoContainer,
                   currentItem[Constant_.FieldUsername] +
                   ' on ' +
                   currentItem[Constant_.FieldDate]);

    appendChild(containerRow,
                textContainer);

    appendChild(containerRow,
                infoContainer);

    return containerRow;

  };


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
  function(containerId, postTo, retrieveItemsUrl, subjectId,
           createADiv, createTheForm, createTheGrid,
           appendChild, createTheMapping, refreshGrid,
           initializeTheForm) {
    
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
    var entryForm = createTheForm(postTo,
                                  subjectId);
     //Grid
    
    var gridOptions = {};
    var parameters = {};
    var mapping = createTheMapping();
    parameters[Constant_.SubjectId] = subjectId;
    parameters[ControlConstant_.Page] = 0;
    gridOptions[GridBuilderConstant_.ContainerClass] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.ContainerId] = Constant_.ItemsGrid;
    gridOptions[GridBuilderConstant_.CreateARow] = src.base.control.wall.createARow;
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
