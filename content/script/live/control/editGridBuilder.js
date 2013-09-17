//Generic

/**
 @param {Object} statusGrid The grid to search for child rows.
 @param {function} getElementsByClass The function used to find all the
 child rows.
 @param {function} forEach The function used to iterate through
 the list of found rows.
 @param {function} getElementByClass The function used to find the edit
 container.
 @param {function} showElement The function used to show all the
 rows.
 @return {function} The created method to call to show all the rows.
 @protected
 */
src.base.control.editGrid.initializeTheForm =
  function(form, createAValidationWrapper, initializeFormComponent,
           onFormSubmital) {
    
    //form === editContainer
    //createAValidationWrapper = src.site.validation.validationInterpreter.createAValidationWrapper;
    //onFormSubmital = src.base.control.editGrid.createPostAdjustmentHandler
    var current = src.base.control.editGrid;
    var FormComponent_ = src.base.control.formComponent;
    
    var validation = createAValidationWrapper(current.AdjustmentRules);
    var datePickerInfo = {};
    
    datePickerInfo[FormComponent_.DatepickerOptions] = {};
    datePickerInfo[FormComponent_.DatepickerTextboxes] = [];
    
    initializeFormComponent(form, datePickerInfo, validation,
                            false, onFormSubmital);
  };


/**
 @param {Object} grid The grid to refresh.
 @param {string} rollupUrl The url to refresh the grid with.
 @param {string} employeeId The employee id needed to get the
 information for the grid rows.
 @param {Object} options The grid options.
 @param {string} startStopUrl Not sure this is used....
 @param {function} refresh The function used to refresh the grid.
 description.
 @return {function} The function used to call to refresh the grid after
 an adjustment is made.
 @protected
 */
src.base.control.editGrid.createPostAdjustmentHandler =
  function(grid, rollupUrl, employeeId, options,
           startStopUrl, refresh) {
    
    return function() {
      refresh(grid, rollupUrl, employeeId, options,
              startStopUrl);
    };
  };


/**
 @param {Object} statusGrid The grid to search for child rows.
 @param {function} getElementsByClass The function used to find all the
 child rows.
 @param {function} forEach The function used to iterate through
 the list of found rows.
 @param {function} getElementByClass The function used to find the edit
 container.
 @param {function} showElement The function used to show all the
 rows.
 @return {function} The created method to call to show all the rows.
 @protected
 */
src.base.control.editGrid.createShowAllRowsHandler =
  function(statusGrid, getElementsByClass, forEach,
           getElementByClass, showElement) {
    
    return function() {
      var current = src.base.control.editGrid;
      var constants = src.base.control.editGrid.constants;
      
      var rows = getElementsByClass(constants.EditRowClass, statusGrid);
      
      forEach(rows, function(row) {
        showElement(row, true);
      });
      
      var editContainer = getElementByClass(constants.EditContainer,
                                            statusGrid);
      
      showElement(editContainer, false);
    };
  };




//Actual

/**
 @param {Object} dataItem The information needed to update the
 edit container input values.
 @param {Object} row The row the edit container should be placed
 next to.
 @param {Object} editContainer The edit container to update.
 @param {function} findNode The function used to find the inputs
 needing change.
 @param {function} setValue The function used to set the values
 for the inputs.
 @param {function} insertSiblingAfter The function used to move
 the existing edit container to right after the row.
 @param {function} showElement The function used to show the
 edit container, and hide the row.
 @param {function} showAllRows The function used to show all the
 rows before the clicked on one is hidden.
 @return {function} The label click handler.
 @protected
 */
src.site.view.someGrid.handleLabelClick =
  function(resultItem, row, editContainer, findNode,
           setValue, insertSiblingAfter, showElement,
           showAllRows) {
    
    return function() {
      var constants = src.site.view.employmentTransaction.statusGridConstants;
      
      var hiddenElement = findNode(editContainer, function(node) {
        return node['id'] === constants.UserId;
      });
      
      setValue(hiddenElement, resultItem[constants.ResultUserId]);
      
      
      insertSiblingAfter(editContainer, row);
      
      showAllRows();
      showElement(row, false);
      showElement(editContainer, true);
    };
  };
