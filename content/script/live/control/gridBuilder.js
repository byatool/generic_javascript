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
src.base.control.gridBuilder.RowClass = 'gridBuilderRowClass';


// var columnMapping = [
//   {'headerText': '', 'propertyName': ''}
// ];


/**
 @param {Object} currentItem The current item from the list of results.
 @param {Array.<Object>} mapping The table mapping used to find the column headers.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} appendChild The function used to add an element to a parent element.
 @return {Object} The created row.
 @protected
 */
src.base.control.gridBuilder.createARow = function(currentItem, mapping, createADiv, setTextContent, appendChild){
  var current = src.base.control.gridBuilder;
  
  var currentRow = createADiv({'class' : current.RowClass });
  
  goog.array.forEach(mapping, function(currentMapping){
    var column = createADiv({'class' : current.ColumnClass});
    setTextContent(column, currentItem[currentMapping['propertyName']]);
    appendChild(currentRow, column);
  });
  
  return currentRow;
};

/*
 
 --  var row = createADiv('');
 --  for each column in options['columnMapping']
 --    cell = createADiv(currentItem[column['ProperyName'])
 --    addChild(row, cell)
 
 */



/**
 @param {Object} options The options that are used to construct the form.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize = function(options, createADiv){//createRows, createARow, createResultHandler, createADiv) {
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
