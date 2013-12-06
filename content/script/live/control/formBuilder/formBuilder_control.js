goog.require('goog.array');
goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.dropDownList');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.formBuilder.control');

//TODO
// PUll the create methods to a file for each.  Too much is being
//  tested on the the test file for this control.

/**
 @param {Object} controlSpec The various control specifications.
 @param {function} createASelect The function used to create a
 drop down list.
 @param {function} initializeSelect The function used to
 retrieve the select items, and populate.
 @return {Object} The created select.
 @protected
 */
src.base.control.formBuilder.control.createAndInitializeASelect =
  function(controlSpec, createASelect, initializeSelect) {

    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;

    var selectAttributes = {};
    selectAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
    selectAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
    selectAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];

    var element = createASelect(selectAttributes,
                                [],
                                '');

    initializeSelect(element,
                     controlSpec[Constant_.Url],
                     controlSpec[Constant_.Parameters],
                     controlSpec[Constant_.DefaultValue]);

    return element;
  };

/**
 @param {Object} controlSpec The current form spec item.
 @param {Object} textbox The text box paired with the date
 picker.
 @param {Object} parentRow The row to add the date picker
 container to.
 @param {Object} datePickerControlList The list of date
 picker information that the date picker needs to be added
 to.
 @param {function} insert The function used to add the
 elements to the datePickerControlList
 @param {function} createADiv The function used to create
 the date picker container.
 @param {function} appendChild The function used to add
 the date picker control to the parentRow.
 @private
 */
src.base.control.formBuilder.control.createDatePicker_ =
  function(controlSpec, textbox, parentRow, datePickerControlList,
           insert, createADiv, appendChild) {

    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;

    var datePickerAttributes = {};
    var datePickerId = controlSpec[ControlConstant_.Id] + Constant_.DateSuffix;
    datePickerAttributes[ControlConstant_.Id] = datePickerId;
    datePickerAttributes[ControlConstant_.Name] = datePickerId;
    var datePickerContainer = createADiv(datePickerAttributes);

    insert(datePickerControlList,
           [datePickerId, textbox]);

    appendChild(parentRow,
                datePickerContainer);
  };


/**
 @param {Object} controlSpec The current form build spec row.
 @param {Object} container The parent row the textbox will be
 appended to.
 @param {function} createATextbox The function used to create
 the needed textbox.
 @param {function} appendChild The function used to append
 the textbox to the parent.
 @return {Object} The created textbox.
 @private
 */
src.base.control.formBuilder.control.createAndAppendATextbox_ =
  function(controlSpec, container, createATextbox, appendChild) {
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;

    var textboxAttributes = {};
    textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
    textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
    textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
    var textbox = createATextbox(textboxAttributes);

    appendChild(container,
                textbox);

    return textbox;
  };



/* PROTECTED FUNCTIONS */

/**
 @param {Object} controlSpec The specifications of the hidden to
 create.
 @param {function} createHidden The function used to create a
 hidden element.
 @param {function} setValue The function used to set the hidden's
 value.
 @return {Object} The created hidden element.
 @protected
 */
src.base.control.formBuilder.control.createAHidden =
  function(controlSpec, createHidden, setValue) {
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;

    var hiddenAttributes = {};
    hiddenAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
    hiddenAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
    hiddenAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
    var hidden = createHidden(hiddenAttributes);

    setValue(hidden, controlSpec[ControlConstant_.Value]);

    return hidden;
  };



/**
 @param {Object} controlSpec The various control specifications.
 @param {Array.<Object>} datePickerControls The list to add any textbox
 that is pair with a date.
 @param {?function} createADiv The function used to create divs.
 @param {?function} createALabel The function used to create a
 label.
 @param {?function} createATextbox The function used to create a
 textbox.
 @param {?function} createAHidden The function used to create a hidden
 element.
 @param {?function} createAndInitializeASelect The function used to
 create a drop down list.
 @param {?function} appendChild The function used to append all
 created elements to a parent element.
 @param {?function} createAClearDiv The function used to create
 a clear:both div.
 @param {?function} insert The function used to add items to
 the datePickerControls list.
 @return {Object} The created control.
 @protected
 */
src.base.control.formBuilder.control.createControl =
  function(controlSpec, datePickerControls, createADiv, createALabel,
           createATextbox, createAHidden,createAndInitializeASelect, appendChild,
           createAClearDiv, insert) {

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createALabel = createALabel ?
      createALabel :
      src.base.helper.domCreation.label;

    createATextbox = createATextbox ?
      createATextbox :
      src.base.helper.domCreation.textbox;

    createAHidden = createAHidden ?
      createAHidden :
      src.base.control.formBuilder.control.createAHidden;

    createAndInitializeASelect = createAndInitializeASelect ?
      createAndInitializeASelect :
      src.base.control.formBuilder.control.createAndInitializeASelect;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    createAClearDiv = createAClearDiv ?
      createAClearDiv :
      src.base.helper.domCreation.createAClearDiv;

    insert = insert ?
      insert :
      goog.array.insert;

    /* Start */

    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.formBuilder.control;

    var formRowAttributes = {};
    formRowAttributes[ControlConstant_.Class] = Constant_.FormRowContainer;
    formRowAttributes[ControlConstant_.Id] = Constant_.FormRowContainer;
    var formRow = createADiv(formRowAttributes);

    var formRowLabelAttributes = {};
    formRowLabelAttributes[ControlConstant_.Class] = Constant_.FormRowLabel;
    var formRowLabel = createALabel(formRowLabelAttributes,
                                    controlSpec[Constant_.LabelText]);

    appendChild(formRow, formRowLabel);


    var element = {};

    switch (controlSpec[ControlConstant_.Type]) {
    case Constant_.Textbox:
      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);
      break;

    case Constant_.Date:
      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);

      Current_.createDatePicker_(controlSpec,
                                 element,
                                 formRow,
                                 datePickerControls,
                                 insert,
                                 createADiv,
                                 appendChild);

      break;

    case Constant_.Hidden:

      var hidden = createAHidden(controlSpec,
                                 src.base.helper.domCreation.hidden,
                                 goog.dom.forms.setValue);

      appendChild(formRow, hidden);
      break;
    case Constant_.Select:
      appendChild(formRow,
                  createAndInitializeASelect(controlSpec,
                                             src.base.helper.domCreation.select,
                                             src.base.control.dropDownList.initialize));
      break;
    default:

      element = Current_.createAndAppendATextbox_(controlSpec,
                                                  formRow,
                                                  createATextbox,
                                                  appendChild);
      break;
    }

    appendChild(formRow, createAClearDiv());

    return formRow;
  };
