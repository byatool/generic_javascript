goog.require('src.base.control.gridBuilder');
goog.require('src.base.control.zippyContainer');

goog.provide('src.base.control.zippyGrid');


// EXPORTED FIELDS


/**
 @const
 @type {string}
 @export
 */
src.base.control.zippyGrid.ZippyContainerId = 'zippyGridContainerId';


// PROTECTED FIELDS

/**
 @const
 @type {string}
 @protected
 */
src.base.control.zippyGrid.ContentContainerClass = 'resultContainer';


// EXPORTED METHODS

/**
 @param {Array} options The needed options to build the bookmark
 list.
 @param {string} url The url needed to get the list of bookmarks.
 @param {function} handleParameters The function used to update
 the parameter values for the grid.
 @param {?function} createARow The function used when the grid 
 builder is creating rows.
 @param {?function} onRowClick The function used when any of the
 list rows are clicked.
 @param {?function} createGrid The function used to create bookmark
 list.
 @param {?function} createZippyContainer The function to create
 the overall container that will be a Zippy control.
 @return {Object} The created work list.
 @export
 */
src.base.control.zippyGrid.initialize =
  function(options, url, handleParameters,
           createARow, onRowClick,
           createGrid, createZippyContainer) {
    
    createGrid = createGrid ?
      createGrid :
      src.base.control.gridBuilder.initialize;
    
    createZippyContainer = createZippyContainer ?
      createZippyContainer :
      src.base.control.zippyContainer.initialize;
    
    var current = src.base.control.zippyGrid;
    var GridBuilder_ = src.base.control.gridBuilder;
    var Zippy_ = src.base.control.zippyContainer;
    
    var contentOptions = {};
    contentOptions[GridBuilder_.ContainerClass] = current.ContentContainerClass;
    contentOptions[GridBuilder_.ContainerId] = current.ContentContainerClass;
    contentOptions[GridBuilder_.Url] = url;
    contentOptions[GridBuilder_.CreateARow] = createARow;
    contentOptions[GridBuilder_.ShowHeader] = false;
    contentOptions[GridBuilder_.RowClickHandler] = onRowClick;
    
    contentOptions[GridBuilder_.Parameters] = handleParameters(options);
    
    contentOptions[GridBuilder_.Map] = [
      { 'headerText': '', 'propertyName': '', 'class': ''}
    ];
    
    var contentContainer = createGrid(contentOptions);
    options[current.ZippyContainerId + 'options'] = contentOptions;
    
    var zippyOptions = {};
    zippyOptions[Zippy_.ContainerId] = options[current.ZippyContainerId];
    zippyOptions[Zippy_.Title] = options[current.ZippyTitle];
    
    return createZippyContainer(zippyOptions, contentContainer);
  };
