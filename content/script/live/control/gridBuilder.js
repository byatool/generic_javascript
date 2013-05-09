goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.gridBuilder');


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
 @param {Object} options The options that are used to construct the form.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @return {Object} The created grid.
 @export
 */
src.base.control.gridBuilder.initialize = function(options, createADiv) {
    var Current = src.base.control.gridBuilder;
  
    var parentContainer = createADiv({
        'id': options[Current.ContainerId],
        'class': options[Current.ContainerClass]
    });
  
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
