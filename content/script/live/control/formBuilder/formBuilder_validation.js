goog.require('goog.array');
goog.require('src.base.control.controlConstant');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.base.control.formBuilder.validation');

/**
 @param {Object} currentItem The current item from the form
 construction list.
 @param {function} forEach The function used to traverse the
 validation lists, and append them to the  return list.
 @param {function} insert The function used to add the validation
 items to the return list.
 @return {Object} The needed validation list.
 @protected
 */
src.base.control.formBuilder.validation.createValidationItem =
  function(currentItem, forEach, insert) {
    var ControlConstant_ = src.base.control.controlConstant;
    var ValidationConstant_ = src.site.validation.validationInterpreter.constant;
    
    var list = [currentItem[ControlConstant_.Id]];
    
    forEach(currentItem[ValidationConstant_.Validation], function(item) {
      insert(list, item);
    });
    
    
    return list;
  };


/**
 @param {Object} formSpec The group of form element details.
 @param {?function} createValidationItem The function used to
 convert the items in the formSpec to validation rules.
 @param {?function} map The function used to create the
 validation rules.
 @param {?function} createAValidationWrapper The function used
 to create the needed validation wrapper.
 @return {Object} The validation parameters.
 @protected
 */
src.base.control.formBuilder.validation.createValidation =
  function(formSpec, createValidationItem, map,
           createAValidationWrapper) {
    
    createValidationItem = createValidationItem ?
      createValidationItem :
      src.base.control.formBuilder.validation.createValidationItem;
    
    map = map ?
      map :
      goog.array.map;
    
    createAValidationWrapper = createAValidationWrapper ?
      createAValidationWrapper :
      src.site.validation.validationInterpreter.createAValidationWrapper;
    
    /* Start */
    
    
    var validationList = map(formSpec, function(item) {
      
      return createValidationItem(item,
                                  goog.array.forEach,
                                  goog.array.insert);
    });
    
    return createAValidationWrapper(validationList);
  };
