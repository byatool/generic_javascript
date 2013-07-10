goog.require('goog.array');
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
src.base.control.gridBuilder.RowClass = 'gridBuilderRowClass';



/**
 @param {Object} currentItem The current item from the list of results.
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.createARow = function(currentItem, mapping, createADiv, setTextContent, appendChild) {  var current = src.base.control.gridBuilder;
                                                                                                                     
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
src.base.control.gridBuilder.createTheHeaderRow = function(mapping, parentContainer, createADiv, setTextContent, appendChild){
  var current = src.base.control.gridBuilder;

  var headerRow = createADiv({'class': current.HeaderRowClass});
  
  goog.array.forEach(mapping, function(currentMap){
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
    var currentRow = createARow(item, mapping, createADiv, setTextContent,  appendChild);
    appendChild(parentContainer, currentRow);
  });
};





/**
 @param {Object} options The options that are used to construct the form.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize = function(options, createADiv) {//createRows, createARow, createResultHandler, createADiv) {
  var Current = src.base.control.gridBuilder;

  var parentContainer = createADiv({
    'id': options[Current.ContainerId],
    'class': options[Current.ContainerClass]
  });


  //headerRow = CreateHeaders(options['columnHeaderNames'])
  //addChild(parentContainer, headerRow)
  //var handler = createResultHandler(grid, createRows, createARow, createADiv, setTextContent)
  //retrieveList(options['url'], options['parameters'], handler)

  return parentContainer;


  /*
   -- Information Block Builder
   --
   -- create(url, requestValues, columns)
   --   requestValues <- {'employeeId': 1}
   --   columns       <- {'firstName', 'lastName'}
   --   return        <- {'firstName': 'bob', 'lastName': 'bobbert'}
   --
   -- [div
   --  [div class='row' id='firstName'
   --    [div class='columnLabel' "First Name"]
   --    [div class='columnValue' @firstName]}]
   --
   -- {firstName: 'hihi'} where id === propertyName (for in)
   --
   */

  /*


   options[Current.Columns] = [
   'first',
   'second'
   ];

   options[Current.Items] = [
   {id: 1, first: 'hihi', second: 'there'},
   {id: 2, first: 'hello', second: 'thar'}
   ]

   options[Current.ClickMethod] = doSomething;
   options[Current.ClickIcon] = 'hihi.jpg';

   createdButton.onClick = function() { doSomething[item.value]; };

   */
};
