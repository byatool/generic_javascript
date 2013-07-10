goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.gridBuilder');

/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ColumnClass = 'gridBuilderColumnClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ContainerClass = 'containerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.HeaderClass = 'gridBuilderHeaderClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.HeaderRowClass = 'gridBuilderHeaderRowClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Map = 'mapping';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Parameters = 'parameters';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.RowClass = 'gridBuilderRowClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.gridBuilder.Url = 'url';


//src.base.control.gridBuilder.GridMapping = [{'headerText':'Last Name', 'propertyName:'LastName}];


/**
 @param {Object} currentItem The current item from the list of results.
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.createARow = function(currentItem, mapping, createADiv, setTextContent, appendChild) { var current = src.base.control.gridBuilder;

  var currentRow = createADiv({'class' : current.RowClass });

  goog.array.forEach(mapping, function(currentMapping) {
    var column = createADiv({'class' : current.ColumnClass});
    setTextContent(column, currentItem[currentMapping['propertyName']]);
    appendChild(currentRow, column);
  });

  return currentRow;
};


/**
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {Object} parentContainer The container to add the rows too.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @protected
 */
src.base.control.gridBuilder.createTheHeaderRow = function(mapping, parentContainer, createADiv, setTextContent, appendChild) {
  var current = src.base.control.gridBuilder;

  var headerRow = createADiv({'class': current.HeaderRowClass});

  goog.array.forEach(mapping, function(currentMap) {
    var header = createADiv({'class': current.HeaderClass});
    setTextContent(header, currentMap['headerText']);
    appendChild(headerRow, header);
  });
};


/**
 @param {Object} result The result returned from the server.
 @param {Object} parentContainer The container to add the rows too.
 @param {Object} mapping The various columns represented by an object.
 @param {function} createADiv The function used to create a div.
 @param {function} appendChild The function used to add an element to a parent element.
 @param {function} createARow The function used to create each row.
 @param {function} setTextContent The function used to set a div's text.
 @protected
 */
src.base.control.gridBuilder.createRows = function(result, parentContainer, mapping, createADiv, appendChild, createARow,  setTextContent) {
  goog.array.forEach(result, function(item) {
    var currentRow = createARow(item, mapping, createADiv, setTextContent, appendChild);
    appendChild(parentContainer, currentRow);
  });
};


/**
 @param {Object} mapping The various columns represented by an object.
 @param {Object} parentContainer The container to add the rows too.
 @param {?function} createTheHeaderRow The function used to create only the header of the grid.
 @param {?function} createRows The function used to create all but the header row.
 @param {?function} createARow The function used to create each non header row.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} appendChild The method used to append a child to a parent element.
 @param {?function} setTextContent The function used to set the text of a div.
 @return {Object} The created result handler.
 @protected
 */
src.base.control.gridBuilder.createTheResultHandler = function(mapping, parentContainer, createTheHeaderRow,
                                                               createRows, createARow, createADiv, appendChild,
                                                               setTextContent) {
  return function(result) {
    createTheHeaderRow(mapping, parentContainer, createADiv, setTextContent, appendChild);
    createRows(result, parentContainer, mapping, createADiv, appendChild, createARow, setTextContent);
  };
};


/**
 @param {Object} options The options that are used to construct the form.
 @param {?function} createARow The function used to create each non header row.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} createResultHandler The function used to create the call back method when posting to the
 server.
 @param {?function} createTheHeaderRow The function used to create only the header of the grid.
 @param {?function} createRows The function used to create all but the header row.
 @param {?function} appendChild The method used to append a child to a parent element.
 @param {?function} setTextContent The function used to set the text of a div.
 @param {?function} submitToUrl The function used to post, and receive the data.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize = function(options, createARow, createADiv, createResultHandler,
                                                   createTheHeaderRow, createRows, appendChild, setTextContent,
                                                   submitToUrl) {
  var Current = src.base.control.gridBuilder;

  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  createResultHandler = createResultHandler ? createResultHandler : Current.createTheResultHandler;
  createTheHeaderRow = createTheHeaderRow ? createTheHeaderRow : Current.createTheHeaderRow;
  createRows = createRows ? createRows : Current.createRows;
  createARow = createARow ? createARow : Current.createARow;
  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
  submitToUrl = submitToUrl ? submitToUrl : src.base.helper.domHelper.submitToUrl;


  var parentContainer = createADiv({ 'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
  var resultHandler = createResultHandler(options[Current.Map], parentContainer, createTheHeaderRow, createRows,
                                          createARow, createADiv, appendChild, setTextContent);

  submitToUrl(options[Current.Url], options[Current.Parameters], resultHandler);

  return parentContainer;
};
