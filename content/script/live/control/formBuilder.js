// var layoutItem_ = {};
// layoutItem_[Current_.Label] = 'First Name:';
// layoutItem_[Current_.PropertyName] = 'firstName';

// var layoutItemTwo_ = {};
// layoutItemTwo_[Current_.Label] = 'Last Name:';
// layoutItemTwo_[Current_.PropertyName] = 'lastName';

// layoutItems_ = [layoutItem_, layoutItemTwo_];
// options_[Current_.LayoutItems] = layoutItems_;

// src.site.view.employmentTransaction.stop.stopValidationRules_ = [
//   ['ActionDate',
//    ['is not empty', 'Last Day Worked is required']],
//   ['EnteredDate',
//    ['is not empty', 'Entered Date is required']],
//   ['ReportedDate',
//    ['is not empty', 'Reported Date is required']],
//   ['StatusStartDate',
//    ['is not empty', 'Status Start Date is required']]];


// src.site.view.employmentTransaction.stop.createTheDatePickerInfo_ = function() {
//   var datePickerInformation = {};
//   var datePickerOptions = {};
//   datePickerOptions[src.base.control.popupDatePicker.ButtonClass] = 'showButton';
//   datePickerOptions[src.base.control.popupDatePicker.ButtonText] = '';
//   datePickerOptions[src.base.control.popupDatePicker.ContainerClass] = '';
//   datePickerOptions[src.base.control.popupDatePicker.DatePickerClass] = '';
//   datePickerOptions[src.base.control.popupDatePicker.PopupClass] = 'popup';
//   datePickerOptions[src.base.control.popupDatePicker.TextboxName] = 'theTextbox';
//   datePickerInformation[src.base.control.formComponent.DatepickerOptions] = datePickerOptions;

//   var datePickerControls = [
//     ['actionDateCointainer', 'ActionDate'],
//     ['enteredDateCointainer', 'EnteredDate'],
//     ['reportedDateCointainer', 'ReportedDate'],
//     ['statusStartDateCointainer', 'StatusStartDate']];

//   datePickerInformation[src.base.control.formComponent.DatepickerTextboxes] = datePickerControls;

//   return datePickerInformation;
// };
//
// var rules = transactionType === 'start' ? Current_.startValidationRules_ : Current_.stopValidationRules_;
// var validationMethod = createAValidationWrapper(rules);


//initializeFormComponent(Current_.FormName, datePickerInfo, validationMethod, null); //Callback doesn't work...

//building
//  need form name
//  need layoutItems to build from
//  need validation rules
//  need datePickter options if exist
//  allow for unused callback at this point
//  add form classes later... maybe
goog.provide('src.base.control.formBuilder');


/**
 @const
 @type {string}
 @export
 */
src.base.control.formBuilder.ContainerId = 'containerId';


/**
 @param {Array} options The needed options to build the form.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @return {Object} The created form.
 @export
 */
src.base.control.formBuilder.initialize = function(options, createADiv) {
  createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
  var Current_ = src.base.control.formBuilder;
  
  var container = createADiv({'id': options[Current_.ContainerId]});
  
  return container;
};
