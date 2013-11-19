goog.require('src.base.control.controlConstant');
goog.require('src.site.validation.validationInterpreter.constant');

goog.provide('src.base.control.formBuilder.validation');

/**
 @protected
 */
src.base.control.formBuilder.validation.createValidationItem =
  function(currentItem) {
    var ControlConstant_ = src.base.control.controlConstant;
    var ValidationConstant_ = src.site.validation.validationInterpreter.constant;
    
    return [
      [currentItem[ControlConstant_.Id],
       currentItem[ValidationConstant_.Validation]
      ]
    ];
  };



// src.site.view.employmentTransaction.stop.form.startValidationRules_ = [
//   ['actionDate',
//    ['is not empty', 'Return To Work Date is required'],
//    ['is a valid date', 'Return To Work Date is not valid: (mm/dd/yyyy)']],
//   ['enteredDate',
//    ['is not empty', 'Entered Date is required']],
//   ['reportedDate',
//    ['is not empty', 'Reported Date is required']],
//   ['statusStartDate',
//    ['is not empty', 'Status Start Date is required']],
//   ['statusCode',
//    ['is not empty', 'Status Code is required.']]];

/**
 @param {Object} formSpec The group of form element details.
 @return {Object} The validation parameters.
 @protected
 */
src.base.control.formBuilder.validation.createValidation =
  function(formSpec, reduce) {
    
    
    return null;
  };



/*
 - [controlSpecs:
 -  {type: 'text', id: 'username', class: 'textInput', label: 'Username:',
 -   validation: [
 -     ['is not empty', 'Return To Work Date is required'],
 -     ['is a valid date', 'Must be a valid date.']
 -  ]}
 -  {type: 'select, default: 'choose', url: 'retrieveUserNames'}
 - ]
 */
